import { IsOptional, IsUUID, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetStatusDto {
  @IsUUID('4')
  subscriptionId: string;

  @ApiProperty({
    description: 'Get full information on the current status',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  full?: boolean;

  @ApiProperty({
    description: 'Ignore autowakeup.',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  noWakeup?: boolean;
}
