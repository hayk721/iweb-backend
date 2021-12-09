import { IsString, IsInt, IsUUID, ValidateIf } from 'class-validator';

export class SendPTTDto {
  @IsUUID('4')
  subscriptionId: string;

  @ValidateIf((o) => o.chatId == undefined || o.phone)
  @IsInt()
  phone: number;

  @IsString()
  @ValidateIf((o) => o.phone == undefined || o.chatId)
  chatId: string;

  @IsString()
  audio: string;
}
