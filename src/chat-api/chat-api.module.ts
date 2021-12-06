import { Module } from '@nestjs/common';
import { ChatApiService } from './chat-api.service';
import { ChatApiProcessor } from './chat-api.processor';
import { BullModule } from '@nestjs/bull';
import { ChatApi } from './api/chat-api';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subscription } from './models/subscription.model';
import { UsersSubscriptions } from './models/users-subscriptions-pivot.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Subscription, UsersSubscriptions]),
    BullModule.registerQueue({
      name: 'channel',
    }),
  ],
  providers: [ChatApiService, ChatApiProcessor, ChatApi],
  exports: [ChatApiService],
})
export class ChatApiModule {}
