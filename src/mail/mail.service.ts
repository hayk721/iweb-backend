import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { User } from '../user/models/user.model';

@Injectable()
export class MailService {
  constructor(
    private configService: ConfigService,
    @InjectQueue('mail-queue')
    private readonly _mailQueue: Queue,
  ) {}

  /**
   * Send password reset queue job
   *
   * @param {User} user
   * @param {string} token
   * @returns Promise<boolean>
   */
  async sendPasswordResetRequest(user: User, token: string): Promise<boolean> {
    try {
      await this._mailQueue.add('password-reset', {
        user,
        token,
      });
      return true;
    } catch (error) {
      console.error(`Error queueing confirmation email to user ${user.email}`);
      return false;
    }
  }

  /**
   * Send email queue job
   *
   * @param {User} user
   * @param {string} token
   */
  async sendEmailVerifyRequest(user: User, token: string): Promise<boolean> {
    try {
      await this._mailQueue.add('email-verify', {
        user,
        token,
      });
      return true;
    } catch (error) {
      console.error(`Error queueing email verify email to user ${user.email}`);
      return false;
    }
  }
}
