import { IsString, IsInt, IsOptional, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsChatId } from '@common/decorators/is-chatId.decorator';

export class GetMessagesHistoryDto {
  @IsUUID('4')
  subscriptionId: string;

  @ApiProperty({
    description: 'Page number, starts from 0, 0 by default. Example: 1.',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  page?: number;

  @ApiProperty({
    description: 'Messages count per page, 100 by default. Example: 200.',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  count?: number;

  @ApiProperty({
    description: 'Chat ID from the message list. Examples: 17633123456@c.us for private messages and 17680561234-1479621234@g.us for the group.',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsChatId()
  chatId?: string;
}
