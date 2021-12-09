import { IsString, IsInt, IsOptional, IsUUID, ValidateIf, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsChatId } from '@common/decorators/is-chatId.decorator';

export class SendButtonsDto {
  @IsUUID('4')
  subscriptionId: string;

  @ApiProperty({
    description:
      'Chat ID from the message list. Examples: 17633123456@c.us for private messages and 17680561234-1479621234@g.us for the group. Used instead of the phone parameter.',
  })
  @ValidateIf((o) => o.phone, { message: 'Required if chatId is not set' })
  @IsNotEmpty()
  @IsInt()
  phone: number;

  @ApiProperty({
    description: 'A phone number starting with the country code. You do not need to add your number.\n' + '\n' + 'USA example: 17472822486.',
  })
  @IsString()
  @IsNotEmpty()
  @IsChatId()
  @ValidateIf((o) => o.chatId, { message: 'Required if phone is not set' })
  chatId: string;

  @ApiProperty({
    description: 'Message title, displayed on top of the message. Example: Title',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Text of message. Example: Please choose option',
  })
  @IsString()
  body: string;

  @ApiProperty({
    description: 'Message footer, displayed on bottom of the message. Example: Thank you',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  footer?: string;

  @ApiProperty({
    description: 'Array of available buttons. Example: ["Option A", "Option B"]',
  })
  @IsString({ each: true })
  buttons: string[];
}
