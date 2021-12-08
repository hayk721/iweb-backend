import { IsString, IsInt, IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SendLinkDto {
  @IsUUID('4')
  subscriptionId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  phone?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  chatId?: string;

  @IsString()
  body: string;

  @IsString()
  previewBase64: string;

  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;
}
