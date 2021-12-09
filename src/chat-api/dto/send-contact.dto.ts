import { IsString, IsInt, IsUUID, ValidateIf, IsNotEmpty } from 'class-validator';
import { IsChatId } from '@common/decorators/is-chatId.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class SendContactDto {
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
    description: 'Contact ID | Contact IDs array. Example: "17633123456@c.us" or ["17633123456@c.us", "17633123457@c.us"]',
  })
  @IsString()
  contactId: string;
}
