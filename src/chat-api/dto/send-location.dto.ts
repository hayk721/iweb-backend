import { IsString, IsInt, IsUUID, ValidateIf, IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';
import { IsChatId } from '@common/decorators/is-chatId.decorator';
import { ToReal } from '@common/decorators/to-real';
import { ApiProperty } from '@nestjs/swagger';

export class SendLocationDto {
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
    description: 'Latitude',
  })
  @ToReal()
  @IsLatitude()
  lat: number;

  @ApiProperty({
    description: 'Longitude',
  })
  @ToReal()
  @IsLongitude()
  lng: number;

  @ApiProperty({
    description: 'Text under the location. Supports two lines. To use two lines, use the "\n" symbol.',
  })
  @IsString()
  address: string;
}
