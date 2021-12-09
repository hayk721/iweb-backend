import { IsString, IsInt, IsUUID, Matches, ValidateIf } from 'class-validator';

export class SendProductDto {
  @IsUUID('4')
  subscriptionId: string;

  @ValidateIf((o) => o.chatId == undefined || o.phone)
  @IsInt()
  phone: number;

  @IsString()
  @ValidateIf((o) => o.phone == undefined || o.chatId)
  chatId: string;

  @IsString()
  @Matches(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)
  body: string;

  @IsString()
  filename: string;

  @IsString()
  productId: string;
}
