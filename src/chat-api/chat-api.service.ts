import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ChatApi } from './api/chat-api';
import { InjectModel } from '@nestjs/sequelize';
import { Subscription } from './models/subscription.model';
import { AxiosRequestConfig } from 'axios';
import {
  Messages,
  SendLinkRequest,
  SendMessageRequest,
  SendMessageStatus,
  SendFileRequest,
  SendPTTRequest,
  SendContactRequest,
  SendLocationRequest,
  SendVCardRequest,
  ForwardMessageRequest,
  SendProductRequest,
  DeleteMessageRequest,
  SendButtonsRequest,
  InstanceStatus,
} from './api/sdk';
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

  /**
   * Only one of two parameters is needed to determine the destination - chatId or phone.
   * @summary Send text with link and link\'s preview to a new or existing chat.
   * @param {IChannel} [channel] channel
   * @param {SendLinkRequest} sendLinkRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof Class2MessagesApi
   */
  async sendLink(channel: IChannel, sendLinkRequest: SendLinkRequest, options?: AxiosRequestConfig): Promise<SendMessageStatus> {
    const messagesApi = await this._chatApi.setChannel(channel).message();
    try {
      return (await messagesApi.sendLink(sendLinkRequest, options)).data;
    } catch (e) {
      throw new BadGatewayException(e.message);
    }
  }

  /**
   * Only one of two parameters is needed to determine the destination - chatId or phone.
   * @summary Send a file to a new or existing chat.
   * @param {IChannel} [channel] channel
   * @param {SendFileRequest} sendFileRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof Class2MessagesApi
   */
  async sendFile(channel: IChannel, sendFileRequest: SendFileRequest, options?: AxiosRequestConfig): Promise<SendMessageStatus> {
    const messagesApi = await this._chatApi.setChannel(channel).message();
    try {
      return (await messagesApi.sendFile(sendFileRequest, options)).data;
    } catch (e) {
      throw new BadGatewayException(e.message);
    }
  }

  /**
   * Only one of two parameters is needed to determine the destination - chatId or phone.
   * @summary Send a ptt-audio to a new or existing chat.
   * @param {IChannel} [channel] channel
   * @param {SendPTTRequest} sendPTTRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof Class2MessagesApi
   */
  async sendPTT(channel: IChannel, sendPTTRequest: SendPTTRequest, options?: AxiosRequestConfig): Promise<SendMessageStatus> {
    const messagesApi = await this._chatApi.setChannel(channel).message();
    try {
      return (await messagesApi.sendPTT(sendPTTRequest, options)).data;
    } catch (e) {
      throw new BadGatewayException(e.message);
    }
  }

  /**
   * Only one of two parameters is needed to determine the destination - chatId or phone.
   * @summary Sending a contact or contact list to a new or existing chat.
   * @param {IChannel} [channel] channel
   * @param {SendContactRequest} sendContactRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof Class2MessagesApi
   */
  async sendContact(channel: IChannel, sendContactRequest: SendContactRequest, options?: AxiosRequestConfig): Promise<SendMessageStatus> {
    const messagesApi = await this._chatApi.setChannel(channel).message();
    try {
      return (await messagesApi.sendContact(sendContactRequest, options)).data;
    } catch (e) {
      throw new BadGatewayException(e.message);
    }
  }

  /**
   * Only one of two parameters is needed to determine the destination - chatId or phone.
   * @summary Sending a location to a new or existing chat.
   * @param {IChannel} [channel] channel
   * @param {SendLocationRequest} sendLocationRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof Class2MessagesApi
   */
  async sendLocation(channel: IChannel, sendLocationRequest: SendLocationRequest, options?: AxiosRequestConfig): Promise<SendMessageStatus> {
    const messagesApi = await this._chatApi.setChannel(channel).message();
    try {
      return (await messagesApi.sendLocation(sendLocationRequest, options)).data;
    } catch (e) {
      throw new BadGatewayException(e.message);
    }
  }

  /**
   * Only one of two parameters is needed to determine the destination - chatId or phone.
   * @summary Sending a vcard to a new or existing chat.
   * @param {IChannel} [channel] channel
   * @param {SendVCardRequest} sendVCardRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof Class2MessagesApi
   */
  async sendVCard(channel: IChannel, sendVCardRequest: SendVCardRequest, options?: AxiosRequestConfig): Promise<SendMessageStatus> {
    const messagesApi = await this._chatApi.setChannel(channel).message();
    try {
      return (await messagesApi.sendVCard(sendVCardRequest, options)).data;
    } catch (e) {
      throw new BadGatewayException(e.message);
    }
  }

  /**
   * Only one of two parameters is needed to determine the destination - chatId or phone.
   * @summary Forwarding messages to a new or existing chat.
   * @param {IChannel} [channel] channel
   * @param {ForwardMessageRequest} forwardMessageRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof Class2MessagesApi
   */
  async forwardMessage(channel: IChannel, forwardMessageRequest: ForwardMessageRequest, options?: AxiosRequestConfig): Promise<SendMessageStatus> {
    const messagesApi = await this._chatApi.setChannel(channel).message();
    try {
      return (await messagesApi.forwardMessage(forwardMessageRequest, options)).data;
    } catch (e) {
      throw new BadGatewayException(e.message);
    }
  }

  /**
   * Only one of two parameters is needed to determine the destination - chatId or phone.
   * @summary Send a file to a new or existing chat.
   * @param {IChannel} [channel] channel
   * @param {SendProductRequest} sendProductRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof Class2MessagesApi
   */
  async sendProduct(channel: IChannel, sendProductRequest: SendProductRequest, options?: AxiosRequestConfig): Promise<SendMessageStatus> {
    const messagesApi = await this._chatApi.setChannel(channel).message();
    try {
      return (await messagesApi.sendProduct(sendProductRequest, options)).data;
    } catch (e) {
      throw new BadGatewayException(e.message);
    }
  }

  /**
   * The message will be deleted.
   * @summary Delete message from WhatsApp.
   * @param {IChannel} [channel] channel
   * @param {DeleteMessageRequest} deleteMessageRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof Class2MessagesApi
   */
  async deleteMessage(channel: IChannel, deleteMessageRequest: DeleteMessageRequest, options?: AxiosRequestConfig): Promise<SendMessageStatus> {
    const messagesApi = await this._chatApi.setChannel(channel).message();
    try {
      return (await messagesApi.deleteMessage(deleteMessageRequest, options)).data;
    } catch (e) {
      throw new BadGatewayException(e.message);
    }
  }

  /**
   * Only one of two parameters is needed to determine the destination - chatId or phone.
   * @summary Sending a buttons to a new or existing chat.
   * @param {IChannel} [channel] channel
   * @param {SendButtonsRequest} sendButtonsRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof Class2MessagesApi
   */
  async sendButtons(channel: IChannel, sendButtonsRequest: SendButtonsRequest, options?: AxiosRequestConfig): Promise<SendMessageStatus> {
    const messagesApi = await this._chatApi.setChannel(channel).message();
    try {
      return (await messagesApi.sendButtons(sendButtonsRequest, options)).data;
    } catch (e) {
      throw new BadGatewayException(e.message);
    }
  }

  /**
   * Reauthorization is necessary only in case of changing the device or manually pressing \"Logout on all devices\" on the phone. Keep the WhastsApp application open during authorization.  Instance statuses:  **authenticated** -  Authorization passed successfully  **init** -  Initial status   **loading** -  The system is still loading, try again in 1 minute   **got qr code** -  There is a QR code and you need to take a picture of it in the Whatsapp application by going to Menu -> WhatsApp Web -> Add. QR code is valid for one minute.   [Example showing base64 images on a page.](https://stackoverflow.com/questions/31526085/how-to-encode-an-image-into-an-html-file)  Manually easier to get [QR-code as an image](/#getQRCode)    When you request the status of the instance in standby mode (status **\"init\"**), it will automatically turn on. To avoid this behavior, use the **no_wakeup** parameter
   * @summary Get the account status and QR code for authorization.
   * @param {IChannel} [channel] channel
   * @param {boolean} [full] Get full information on the current status
   * @param {boolean} [noWakeup] Ignore autowakeup
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof Class1InstanceApi
   */
  async getStatus(channel: IChannel, full?: boolean, noWakeup?: boolean, options?: AxiosRequestConfig): Promise<InstanceStatus> {
    const instanceApi = await this._chatApi.setChannel(channel).instance();
    try {
      return (await instanceApi.getStatus(full, noWakeup, options)).data;
    } catch (e) {
      throw new BadGatewayException(e.message);
    }
  }

  /**
   *
   * @summary Direct link to QR-code in the form of an image, not base64.
   * @param {IChannel} [channel] channel
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof Class1InstanceApi
   */
  async getQRCode(channel: IChannel, options?: AxiosRequestConfig): Promise<InstanceStatus> {
    const instanceApi = await this._chatApi.setChannel(channel).instance();
    try {
      return (await instanceApi.getQRCode(options)).data;
    } catch (e) {
      throw new BadGatewayException(e.message);
    }
  }
}
