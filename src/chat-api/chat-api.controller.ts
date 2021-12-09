import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChatApiService } from './chat-api.service';
import { CurrentUser } from '@currentUser';
import { User } from '../user/models/user.model';
import { GetMessagesDto } from './dto/get-messages.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetMessagesHistoryDto } from './dto/get-messages-history.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { SendLinkDto } from './dto/send-link.dto';
import { SendFileDto } from './dto/send-file.dto';
import { SendPTTDto } from './dto/send-PTT.dto';
import { SendContactDto } from './dto/send-contact.dto';
import { SendLocationDto } from './dto/send-location.dto';
import { SendVCardDto } from './dto/send-VCard.dto';
import { SendForwardMessageDto } from './dto/send-forward-message.dto';
import { SendProductDto } from './dto/send-product.dto';
import { SendButtonsDto } from './dto/send-buttons.dto';
import { DeleteMessagesDto } from './dto/delete-messages.dto';
import { GetStatusDto } from './dto/get-status.dto';
import { SubscriptionDto } from './dto/subscription.dto';
import {
  SendLinkRequest,
  SendMessageRequest,
  SendFileRequest,
  SendPTTRequest,
  SendContactRequest,
  SendLocationRequest,
  SendVCardRequest,
  ForwardMessageRequest,
  SendProductRequest,
  DeleteMessageRequest,
  SendButtonsRequest,
} from './api/sdk';
import { IChannel } from './interfaces/channel.interface';

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
      quotedMsgId: body.quotedMsgId,
      mentionedPhones: body.mentionedPhones,
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
      mentionedPhones: body.mentionedPhones,
      quotedMsgId: body.quotedMsgId,
      text: body.text,
    };
    return this._chatApiService.sendLink(subscription, sendLinkRequest);
  }

  /**
   * Send a file to a new or existing chat.
   *
   * @param user
   * @param body
   */
  @Post('sendFile')
  async sendFile(@CurrentUser() user: User, @Body() body: SendFileDto) {
    const { subscriptionId } = body;
    const subscription = this._getSubscription(user, subscriptionId);
    const sendFileRequest: SendFileRequest = {
      body: body.body,
      chatId: body.chatId,
      phone: body.phone,
      filename: body.filename,
      caption: body.caption,
      cached: body.cached,
      quotedMsgId: body.quotedMsgId,
    };
    return this._chatApiService.sendFile(subscription, sendFileRequest);
  }

  /**
   * Send a ptt-audio to a new or existing chat.
   *
   * @param user
   * @param body
   * @private
   */
  @Post('sendPTT')
  async sendPTT(@CurrentUser() user: User, @Body() body: SendPTTDto) {
    const { subscriptionId } = body;
    const subscription = this._getSubscription(user, subscriptionId);
    const sendPTTRequest: SendPTTRequest = {
      chatId: body.chatId,
      phone: body.phone,
      audio: body.audio,
      quotedMsgId: body.quotedMsgId,
    };
    return this._chatApiService.sendPTT(subscription, sendPTTRequest);
  }

  /**
   * Sending a contact or contact list to a new or existing chat.
   *
   * @param user
   * @param body
   * @private
   */
  @Post('sendContact')
  async sendContact(@CurrentUser() user: User, @Body() body: SendContactDto) {
    const { subscriptionId } = body;
    const subscription = this._getSubscription(user, subscriptionId);
    const sendContactRequest: SendContactRequest = {
      chatId: body.chatId,
      phone: body.phone,
      contactId: body.contactId,
    };
    return this._chatApiService.sendContact(subscription, sendContactRequest);
  }

  /**
   * Sending a location to a new or existing chat.
   *
   * @param user
   * @param body
   * @private
   */
  @Post('sendLocation')
  async sendLocation(@CurrentUser() user: User, @Body() body: SendLocationDto) {
    const { subscriptionId } = body;
    const subscription = this._getSubscription(user, subscriptionId);
    const sendLocationRequest: SendLocationRequest = {
      chatId: body.chatId,
      phone: body.phone,
      lat: body.lat,
      lng: body.lng,
      address: body.address,
    };
    return this._chatApiService.sendLocation(subscription, sendLocationRequest);
  }

  /**
   * Sending a vcard to a new or existing chat.
   *
   * @param user
   * @param body
   * @private
   */
  @Post('sendVCard')
  async sendVCard(@CurrentUser() user: User, @Body() body: SendVCardDto) {
    const { subscriptionId } = body;
    const subscription = this._getSubscription(user, subscriptionId);
    const sendVCardRequest: SendVCardRequest = {
      chatId: body.chatId,
      phone: body.phone,
      vcard: body.vcard,
    };
    return this._chatApiService.sendVCard(subscription, sendVCardRequest);
  }

  /**
   * Forwarding messages to a new or existing chat.
   *
   * @param user
   * @param body
   * @private
   */
  @Post('forwardMessage')
  async forwardMessage(@CurrentUser() user: User, @Body() body: SendForwardMessageDto) {
    const { subscriptionId } = body;
    const subscription = this._getSubscription(user, subscriptionId);
    const forwardMessageRequest: ForwardMessageRequest = {
      chatId: body.chatId,
      phone: body.phone,
      messageId: body.messageId,
    };
    return this._chatApiService.forwardMessage(subscription, forwardMessageRequest);
  }

  /**
   * Send a file to a new or existing chat.
   *
   * @param user
   * @param body
   * @private
   */
  @Post('sendProduct')
  async sendProduct(@CurrentUser() user: User, @Body() body: SendProductDto) {
    const { subscriptionId } = body;
    const subscription = this._getSubscription(user, subscriptionId);
    const sendProductRequest: SendProductRequest = {
      chatId: body.chatId,
      phone: body.phone,
      body: body.body,
      filename: body.filename,
      productId: body.productId,
    };
    return this._chatApiService.sendProduct(subscription, sendProductRequest);
  }

  /**
   * Sending a buttons to a new or existing chat.
   *
   * @param user
   * @param body
   * @private
   */
  @Post('sendButtons')
  async sendButtons(@CurrentUser() user: User, @Body() body: SendButtonsDto) {
    const { subscriptionId } = body;
    const subscription = this._getSubscription(user, subscriptionId);
    const sendButtonsRequest: SendButtonsRequest = {
      phone: body.phone,
      chatId: body.chatId,
      title: body.title,
      body: body.body,
      footer: body.footer,
      buttons: body.buttons,
    };
    return this._chatApiService.sendButtons(subscription, sendButtonsRequest);
  }

  /**
   * Delete message from WhatsApp.
   *
   * @param user
   * @param body
   * @private
   */
  @Post('deleteMessage')
  async deleteMessage(@CurrentUser() user: User, @Body() body: DeleteMessagesDto) {
    const { subscriptionId } = body;
    const subscription = this._getSubscription(user, subscriptionId);
    const deleteMessageRequest: DeleteMessageRequest = {
      messageId: body.messageId,
    };
    return this._chatApiService.deleteMessage(subscription, deleteMessageRequest);
  }

  /**
   * Get the account status and QR code for authorization.
   *
   * @param user
   * @param params
   */
  @Get('status')
  async getStatus(@CurrentUser() user: User, @Query() params: GetStatusDto) {
    const { full, noWakeup, subscriptionId } = params;
    const subscription = this._getSubscription(user, subscriptionId);
    return this._chatApiService.getStatus(subscription, full, noWakeup);
  }

  /**
   * Direct link to QR-code in the form of an image, not base64.
   *
   * @param user
   * @param params
   */
  @Get('qr_code')
  async getQRCode(@CurrentUser() user: User, @Query() params: SubscriptionDto) {
    const { subscriptionId } = params;
    const subscription = this._getSubscription(user, subscriptionId);
    return this._chatApiService.getQRCode(subscription);
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
