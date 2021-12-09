import { IsString, IsInt, IsUUID, IsNumber, ValidateIf } from 'class-validator';

export class SendLocationDto {
  @IsUUID('4')
  subscriptionId: string;

  @ValidateIf((o) => o.chatId == undefined || o.phone)
  @IsInt()
  phone: number;

  @IsString()
  @ValidateIf((o) => o.phone == undefined || o.chatId)
  chatId: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;

  @IsString()
  address: string;
}
