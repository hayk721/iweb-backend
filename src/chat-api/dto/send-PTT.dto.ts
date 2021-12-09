import { IsString, IsInt, IsUUID, ValidateIf, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsChatId } from '@common/decorators/is-chatId.decorator';
import { IsMessageId } from '@common/decorators/is-messageId.decorator';

export class SendPTTDto {
  @IsUUID('4')
  subscriptionId: string;

  @ApiProperty({
    description: 'A phone number starting with the country code. You do not need to add your number.\n' + '\n' + 'USA example: 17472822486.',
  })
  @ValidateIf((o) => o.phone, { message: 'Required if chatId is not set' })
  @IsNotEmpty()
  @IsInt()
  phone: number;

  @ApiProperty({
    description:
      'Chat ID from the message list. Examples: 17633123456@c.us for private messages and 17680561234-1479621234@g.us for the group. Used instead of the phone parameter.',
  })
  @IsString()
  @IsNotEmpty()
  @IsChatId()
  @ValidateIf((o) => o.chatId, { message: 'Required if phone is not set' })
  chatId: string;

  @ApiProperty({
    description: 'A link to an audio ogg-file in opus codec\n' + '\n' + 'Or base64 ogg-file in opus codec, for example data:audio/ogg;base64',
  })
  @IsString()
  audio: string;

  @ApiProperty({
    description: 'Quoted message ID from the message list. Example: false_17472822486@c.us_DF38E6A25B42CC8CCE57EC40F.',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsMessageId()
  quotedMsgId?: string;
}
