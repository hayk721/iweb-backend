import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bull';
import { ConfigService } from '@nestjs/config';

@Processor('channel')
export class ChatApiProcessor {
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
   * Send email verify mail
   *
   * @param {{ user: User; token: string }} job
   */
  @Process('test')
  async sendVerifyEmail(job: Job<any>): Promise<void> {
    try {
      console.log(`I'm test`, job);
    } catch (error) {
      throw error;
    }
  }
}
