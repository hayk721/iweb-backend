import { Module } from '@nestjs/common';
import { FirebaseAdmin } from './firebase-admin';
import { SequelizeModule } from '@nestjs/sequelize';
import { FcmNotification } from './models/fcm-notifications.model';
import { AppEventsListener } from './listeners/app-events.listener';

@Module({
  imports: [SequelizeModule.forFeature([FcmNotification])],
  providers: [FirebaseAdmin, AppEventsListener],
  controllers: [],
  exports: [FirebaseAdmin],
})
export class FirebaseModule {}
