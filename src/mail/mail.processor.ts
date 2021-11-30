import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bull';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/models/user.model';

@Processor('mail-queue')
export class MailProcessor {
  constructor(private readonly _mailerService: MailerService, private readonly _configService: ConfigService) {}

  @OnQueueActive()
  onActive(job: Job): void {
    console.debug(`Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`);
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any): void {
    console.debug(`Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(result)}`);
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any): void {
    console.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
  }
  /**
   * Send password reset request mail
   *
   * @param {{ user: User; token: string }} job
   */
  @Process('password-reset')
  async sendPasswordResetEmail(job: Job<{ user: User; token: string }>): Promise<void> {
    console.log(`Sending confirmation email to '${job.data.user.email}'`);

    const { user, token } = job.data;

    const url = this._frontUrl('reset-password', token);

    try {
      await this._mailerService.sendMail({
        to: user.email,
        subject: 'Password reset',
        template: './password-reset', // `.hbs` extension is appended automatically
        context: {
          name: user.firstName + ' ' + user.lastName,
          url,
        },
      });
    } catch (error) {
      console.error(`Failed to send password reset email to '${job.data.user.email}'`, error.stack);
      throw error;
    }
  }

  /**
   * Send email verify mail
   *
   * @param {{ user: User; token: string }} job
   */
  @Process('email-verify')
  async sendVerifyEmail(job: Job<{ user: User; token: string }>): Promise<void> {
    console.log(`Sending email verify email to '${job.data.user.email}'`);

    const { user, token } = job.data;

    const url = this._frontUrl('email-verify', token);

    try {
      await this._mailerService.sendMail({
        to: user.email,
        subject: 'Password reset',
        template: './password-reset', // `.hbs` extension is appended automatically
        context: {
          name: user.firstName + ' ' + user.lastName,
          url,
        },
      });
    } catch (error) {
      console.error(`Failed to send email verify reset email to '${job.data.user.email}'`, error.stack);
      throw error;
    }
  }

  /**
   * get front url
   *
   * @param {string} path
   * @param {string} token
   * @return string
   */
  private _frontUrl(path: string, token: string) {
    return `${this._configService.get('FRONT_URL')}/${path}/${token}`;
  }
}
