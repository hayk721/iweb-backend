import { IsString, IsInt, IsOptional, IsUUID, Matches, ValidateIf, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsChatId } from '@common/decorators/is-chatId.decorator';

export class SendFileDto {
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
    description: 'Or base64-encoded file with mime data, for example data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...File in form-data input field',
  })
  @IsString()
  @Matches(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)
  body: string;

  @ApiProperty({
    description: 'File name, for example 1.jpg or hello.xlsx',
  })
  @IsString()
  filename: string;

  @ApiProperty({
    description: 'Text under the file. When sending an image сan be used with mentionedPhones, example: this image for @78005553535.',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  caption?: string;

  @ApiProperty({
    description: 'Try to use a previously uploaded file instead of uploading it with each request.',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  cached?: boolean;

  @ApiProperty({
    description: 'Quoted message ID from the message list. Example: false_17472822486@c.us_DF38E6A25B42CC8CCE57EC40F.',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  quotedMsgId?: string;
}
