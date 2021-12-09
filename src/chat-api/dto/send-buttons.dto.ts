import { IsString, IsInt, IsOptional, IsUUID, IsArray, ValidateNested, ValidateIf } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SendButtonsDto {
  @IsUUID('4')
  subscriptionId: string;

  @ValidateIf((o) => o.chatId == undefined || o.phone)
  @IsInt()
  phone: number;

  @IsString()
  @ValidateIf((o) => o.phone == undefined || o.chatId)
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

  @IsArray()
  @ValidateNested({ each: true })
  buttons: Array<string>;
}
