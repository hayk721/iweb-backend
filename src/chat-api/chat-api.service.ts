import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ChatApi } from './api/chat-api';
import { InjectModel } from '@nestjs/sequelize';
import { Subscription } from './models/subscription.model';
import { AxiosRequestConfig } from 'axios';
import { Messages, SendMessageRequest, SendMessageStatus } from './api/sdk';
import { IChannel } from './interfaces/channel.interface';

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

  /**
   * To receive only new messages, pass the **lastMessageNumber** parameter from the last query.  Files from messages are guaranteed to be stored only for 30 days and can be deleted. Download the files as soon as you get to your server.
   * @summary Get a list of messages.
   * @param {IChannel} [channel] channel
   * @param {number} [lastMessageNumber] The lastMessageNumber parameter from the last response
   * @param {boolean} [last] Displays the last 100 messages. If this parameter is passed, then lastMessageNumber is ignored.
   * @param {string} [chatId] Filter messages by chatId  Chat ID from the message list. Examples: 17633123456@c.us for private messages and 17680561234-1479621234@g.us for the group.
   * @param {number} [limit] Sets length of the message list. Default 100. With value 0 returns all messages.
   * @param {number} [minTime] Filter messages received after specified time. Example: 946684800.
   * @param {number} [maxTime] Filter messages received before specified time. Example: 946684800.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof Class2MessagesApi
   */
  async getMessage(
    channel: IChannel,
    lastMessageNumber?: number,
    last?: boolean,
    chatId?: string,
    limit?: number,
    minTime?: number,
    maxTime?: number,
    options?: AxiosRequestConfig,
  ): Promise<Messages> {
    const messagesApi = await this._chatApi.setChannel(channel).message();
    try {
      return (await messagesApi.getMessages(lastMessageNumber, last, chatId, limit, minTime, maxTime, options)).data;
    } catch (e) {
      throw new BadGatewayException(e.message);
    }
  }
  /**
   * To receive only new messages, pass the **lastMessageNumber** parameter from the last query.  Files from messages are guaranteed to be stored only for 30 days and can be deleted. Download the files as soon as you get to your server.
   * @summary Get a list of messages.
   * @param {IChannel} [channel] channel
   * @param {number} [page] page number
   * @param {number} [count] page items count.
   * @param {string} [chatId] Filter messages by chatId  Chat ID from the message list. Examples: 17633123456@c.us for private messages and 17680561234-1479621234@g.us for the group.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof Class2MessagesApi
   */
  async getMessagesHistory(channel: IChannel, page?: number, count?: number, chatId?: string, options?: AxiosRequestConfig): Promise<Messages> {
    const messagesApi = await this._chatApi.setChannel(channel).message();
    try {
      return (await messagesApi.getMessagesHistory(page, count, chatId, options)).data;
    } catch (e) {
      throw new BadGatewayException(e.message);
    }
  }
  /**
   * The message will be added to the queue for sending and delivered even if the phone is disconnected from the Internet or authorization is not passed.  Only one of two parameters is needed to determine the destination - chatId or phone.
   * @summary Send a message to a new or existing chat.
   * @param {IChannel} [channel] channel
   * @param {SendMessageRequest} sendMessageRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof Class2MessagesApi
   */
  async sendMessage(channel: IChannel, sendMessageRequest: SendMessageRequest, options?: AxiosRequestConfig): Promise<SendMessageStatus> {
    const messagesApi = await this._chatApi.setChannel(channel).message();
    try {
      return (await messagesApi.sendMessage(sendMessageRequest, options)).data;
    } catch (e) {
      throw new BadGatewayException(e.message);
    }
  }
}
