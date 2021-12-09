import { IsString, IsInt, IsUUID, ValidateIf, IsLatitude, IsLongitude } from 'class-validator';
import { IsChatId } from '@common/decorators/is-chatId.decorator';
import { ToReal } from '@common/decorators/to-real';

export class SendLocationDto {
  @IsUUID('4')
  subscriptionId: string;

  @ValidateIf((o) => !o.chatId)
  @IsInt()
  phone: number;

  @IsChatId()
  @ValidateIf((o) => !o.phone)
  chatId: string;

  @ToReal()
  @IsLatitude()
  lat: number;

  @ToReal()
  @IsLongitude()
  lng: number;

  @IsString()
  address: string;
}
