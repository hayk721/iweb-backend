import { Chats, Class1InstanceApi, Class2MessagesApi, Class3ChatsApi, Configuration, ConfigurationParameters, Messages, Settings } from './sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatApi {
  private _instance: Class1InstanceApi;
  private _message: Class2MessagesApi;
  private _chat: Class3ChatsApi;

  setChannel(configurationParameters: ConfigurationParameters): ChatApi {
    const config = new Configuration(configurationParameters);
    this._instance = new Class1InstanceApi(config);
    this._message = new Class2MessagesApi(config);
    this._chat = new Class3ChatsApi(config);
    return this;
  }

  async test(): Promise<{ settings: Settings; messages: Messages; chat: Chats } | null> {
    try {
      return {
        settings: (await this._instance.getSettings()).data,
        messages: (await this._message.getMessages()).data,
        chat: (await this._chat.getChats()).data,
      };
    } catch (e) {
      console.error(e.message);
      return null;
    }
  }
}
