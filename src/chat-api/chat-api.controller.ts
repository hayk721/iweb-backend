import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChatApiService } from './chat-api.service';
import { CurrentUser } from '@currentUser';
import { User } from '../user/models/user.model';
import { GetMessagesDto } from './dto/get-messages.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetMessagesHistoryDto } from './dto/get-messages-history.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { SendMessageRequest } from './api/sdk';

@ApiTags('chat-api')
@ApiBearerAuth()
@Controller('chat-api')
export class ChatApiController {
  constructor(private readonly _chatApiService: ChatApiService) {}

  /**
   * Get all messages
   *
   * @param user
   * @param params
   */
  @Get('messages')
  async getMessages(@CurrentUser() user: User, @Query() params: GetMessagesDto) {
    const { lastMessageNumber, last, minTime, maxTime, limit, chatId, subscriptionId } = params;
    const subscription = this._getSubscription(user, subscriptionId);
    return this._chatApiService.getMessage(subscription, lastMessageNumber, last, chatId, limit, minTime, maxTime);
  }
  /**
   * Get all messages
   *
   * @param user
   * @param params
   */
  @Get('messagesHistory')
  async getMessagesHistory(@CurrentUser() user: User, @Query() params: GetMessagesHistoryDto) {
    const { page, count, chatId, subscriptionId } = params;
    const subscription = this._getSubscription(user, subscriptionId);
    return this._chatApiService.getMessagesHistory(subscription, page, count, chatId);
  }
  /**
   * Get all messages
   *
   * @param user
   * @param body
   */
  @Post('sendMessage')
  async sendMessage(@CurrentUser() user: User, @Body() body: SendMessageDto) {
    const { subscriptionId } = body;
    const subscription = this._getSubscription(user, subscriptionId);
    const sendMessageRequest: SendMessageRequest = {
      body: body.body,
      chatId: body.chatId,
      phone: body.phone,
    };
    return this._chatApiService.sendMessage(subscription, sendMessageRequest);
  }

  /**
   * Get subscription and throw error if not exists
   *
   * @param user
   * @param subscriptionId
   * @private
   */
  private _getSubscription(user: User, subscriptionId: string): { apiKey: string; instanceId: string } {
    const subscription = user.subscriptions.find((s) => s.id === subscriptionId);
    if (!subscription) throw new BadRequestException('Subscription not found');
    return { apiKey: subscription.apiKey, instanceId: subscription.instanceId };
  }
}
