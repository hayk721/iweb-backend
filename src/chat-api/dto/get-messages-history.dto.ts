import { IsString, IsInt, IsOptional, IsBoolean, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetMessagesHistoryDto {
  @IsUUID('4')
  subscriptionId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  count?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  chatId?: string;
}
