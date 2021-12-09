import { IsString, IsInt, IsOptional, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsChatId } from '@common/decorators/is-chatId.decorator';

export class GetMessagesDto {
  @IsUUID('4')
  subscriptionId: string;

  @ApiProperty({
    description: 'The lastMessageNumber parameter from the last response',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  lastMessageNumber?: number;

  @ApiProperty({
    description: 'Displays the last 100 messages. If this parameter is passed, then lastMessageNumber is ignored.',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  last?: boolean;

  @ApiProperty({
    description: 'Chat ID from the message list. Examples: 17633123456@c.us for private messages and 17680561234-1479621234@g.us for the group',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsChatId()
  chatId?: string;

  @ApiProperty({
    description: 'Sets length of the message list. Default 100. With value 0 returns all messages.',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  limit?: number;

  @ApiProperty({
    description: 'Filter messages received after specified time. Example: 946684800.',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  minTime?: number;

  @ApiProperty({
    description: 'Filter messages received before specified time. Example: 946684800.',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  maxTime?: number;
}
