import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ChatApi } from './api/chat-api';
import { InjectModel } from '@nestjs/sequelize';
import { Subscription } from './models/subscription.model';

@Injectable()
export class ChatApiService {
  constructor(
    private readonly _configService: ConfigService,
    @Inject(ChatApi)
    private readonly _chatApi: ChatApi,
    @InjectQueue('channel')
    private readonly _queue: Queue,
    @InjectModel(Subscription)
    private readonly _subscription: typeof Subscription,
  ) {}

  /**
   * Test method
   *
   * @returns Promise<boolean>
   */
  async test(): Promise<void> {
    const channel = await this._subscription.findOne({ attributes: ['apiKey', 'instanceId'], raw: true });
    const res = await this._chatApi.setChannel(channel).test();
    console.log(res);
  }
}
