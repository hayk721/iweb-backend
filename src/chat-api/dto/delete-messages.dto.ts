import { IsString, IsUUID } from 'class-validator';

export class DeleteMessagesDto {
  @IsUUID('4')
  subscriptionId: string;

  @IsString()
  messageId?: string;
}
