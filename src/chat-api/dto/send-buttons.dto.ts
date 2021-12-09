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
  @ValidateIf((o) => !o.phone, { message: 'Required if chatId is not set' })
  @IsNotEmpty()
  @IsInt()
  phone: number;

  @IsString()
  @IsNotEmpty()
  @IsChatId()
  @ValidateIf((o) => !o.chatId, { message: 'Required if phone is not set' })
  chatId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  body: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  footer?: string;

  @IsString({ each: true })
  buttons: string[];
}
