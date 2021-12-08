import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChatApiService } from './chat-api.service';
import { CurrentUser } from '@currentUser';
import { User } from '../user/models/user.model';
import { GetMessagesDto } from './dto/get-messages.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetMessagesHistoryDto } from './dto/get-messages-history.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { SendLinkDto } from './dto/send-link.dto';
import { SendLinkRequest, SendMessageRequest } from './api/sdk';

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
   * Get a list of messages sorted by time descending
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
   * Send a message to a new or existing chat.
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
   * Send text with link and link's preview to a new or existing chat.
   *
   * @param user
   * @param body
   */
  @Post('sendLink')
  async sendLink(@CurrentUser() user: User, @Body() body: SendLinkDto) {
    const { subscriptionId } = body;
    const subscription = this._getSubscription(user, subscriptionId);
    const sendLinkRequest: SendLinkRequest = {
      body: body.body,
      chatId: body.chatId,
      phone: body.phone,
      previewBase64: body.previewBase64,
      title: body.title,
      description: body.description,
    };
    return this._chatApiService.sendLink(subscription, sendLinkRequest);
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
