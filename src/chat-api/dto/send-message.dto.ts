import { IsString, IsInt, IsOptional, IsUUID, ValidateIf, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsChatId } from '@common/decorators/is-chatId.decorator';
import { IsMessageId } from '@common/decorators/is-messageId.decorator';

export class SendMessageDto {
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
    description: 'Message text, UTF-8 or UTF-16 string with emoji 🍏. Can be used with mentionedPhones, example: this text for @78005553535',
  })
  @IsString()
  body: string;

  @ApiProperty({
    description: 'Quoted message ID from the message list. Example: false_17472822486@c.us_DF38E6A25B42CC8CCE57EC40F.',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsMessageId()
  quotedMsgId?: string;

  @ApiProperty({
    description:
      'Phone numbers of the mentioned contacts in an array or in a comma-separated string. Example: 78005553535,78005553536 or [78005553535,78005553536]\n' +
      '\n' +
      'ATTENTION For correct use, you must insert @[mentioned phone] in the message text.',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mentionedPhones?: string;
}
