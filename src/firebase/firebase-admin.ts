import { Injectable } from '@nestjs/common';
import * as Admin from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';
import { messaging } from 'firebase-admin/lib/messaging';
import { InjectModel } from '@nestjs/sequelize';
import { FcmNotification } from './models/fcm-notifications.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseAdmin {
  app: any;
  bucket: Bucket;
  constructor(private readonly _configService: ConfigService, @InjectModel(FcmNotification) private readonly _fcmNotification: typeof FcmNotification) {
    this.app = Admin.initializeApp({
      credential: Admin.credential.cert(this._configService.get('firebase-admin')),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });

    this.bucket = Admin.storage().bucket();
  }
  async sendMessage(message: messaging.TokenMessage) {
    await Admin.messaging().send({
      ...message,
      webpush: {
        headers: {
          Urgency: 'high',
        },
      },
    });
  }
  async sendToUserDevices(registrationTokens: string | string[], payload?: messaging.MessagingPayload): Promise<messaging.MessagingDevicesResponse> {
    try {
      const response = await Admin.messaging().sendToDevice(registrationTokens, payload);
      const tokensToRemove = response.results.map((result, index) => {
        const error = result.error;
        if (error) {
          console.error('Failure sending notification to', registrationTokens[index], error);
          // Cleanup the tokens who are not registered anymore.
          if (error.code === 'messaging/invalid-registration-token' || error.code === 'messaging/registration-token-not-registered') {
            return registrationTokens[index];
          }
        }
      });
      await this._fcmNotification.destroy({ where: { token: tokensToRemove } });
      return response;
    } catch (e) {
      return e;
    }
  }
  async subscribeToTopic(registrationTokens: string | string[], topic: string) {
    try {
      return await Admin.messaging().subscribeToTopic(registrationTokens, topic);
    } catch (e) {
      console.error(e);
    }
  }
  async unsubscribeFromTopic(registrationTokens: string | string[], topic: string) {
    try {
      return await Admin.messaging().subscribeToTopic(registrationTokens, topic);
    } catch (e) {
      console.error(e);
    }
  }
  async storeFile(destination: string, buffer: Buffer, contentType, isPublic = true): Promise<string> {
    const file = this.bucket.file(destination);
    await file.save(buffer, {
      contentType,
      gzip: true,
      public: isPublic,
      metadata: {
        //cacheControl: 'public, max-age=31536000',
      },
    });
    return file.publicUrl();
  }
  async deleteFile(destination: string): Promise<boolean> {
    try {
      const file = this.bucket.file(destination);
      await file.delete({ ignoreNotFound: true });
      return true;
    } catch (e) {
      return false;
    }
  }
}
