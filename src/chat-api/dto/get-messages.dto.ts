import { IsString, IsInt, IsOptional, IsBoolean, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetMessagesDto {
  @IsUUID('4')
  subscriptionId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  lastMessageNumber?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  last?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  chatId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  minTime?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  maxTime?: number;
}
