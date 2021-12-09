import { IsString, IsInt, IsUUID, Matches, ValidateIf, IsNotEmpty } from 'class-validator';
import { IsChatId } from '@common/decorators/is-chatId.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class SendProductDto {
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
    description: 'Or base64-encoded file with mime data, for example data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...\n' + '\n' + 'File in form-data input field',
  })
  @IsString()
  @Matches(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)
  body: string;

  @ApiProperty({
    description: 'File name, for example 1.jpg',
  })
  @IsString()
  filename: string;

  @ApiProperty({
    description: 'Id of the product. Can be achieved via /getProducts',
  })
  @IsString()
  productId: string;
}
