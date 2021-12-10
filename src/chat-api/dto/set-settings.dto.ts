import { IsString, IsUUID, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SetSettingsDto {
  @IsUUID('4')
  subscriptionId: string;

  @ApiProperty({
    description: 'Http or https URL for receiving notifications. For testing, we recommend using our RequestBin.',
  })
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  webhookUrl?: string;

  @ApiProperty({
    description: 'Turn on/off ack (message delivered and message viewed) notifications in webhooks. GET method works for the same address.',
  })
  @IsBoolean()
  @ApiPropertyOptional()
  @IsOptional()
  ackNotificationsOn?: boolean;

  @ApiProperty({
    description: 'Turn on/off chat update notifications in webhooks. GET method works for the same address.',
  })
  @IsBoolean()
  @ApiPropertyOptional()
  @IsOptional()
  chatUpdateOn?: boolean;

  @ApiProperty({
    description: 'Quoted message ID from the message list. Example: false_17472822486@c.us_DF38E6A25B42CC8CCE57EC40F.',
  })
  @IsBoolean()
  @ApiPropertyOptional()
  @IsOptional()
  videoUploadOn?: boolean;

  @ApiProperty({
    description: 'Socks5 IP address and port proxy for instance.',
  })
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  proxy?: string;

  @ApiProperty({
    description: 'Guarantee webhook delivery. Each webhook will make 20 attempts to send until it receives 200 status from the server.',
  })
  @IsBoolean()
  @ApiPropertyOptional()
  @IsOptional()
  guaranteedHooks?: boolean;

  @ApiProperty({
    description: 'Do not send webhooks with old messages (receiver 5 minutes or oldMessagesPeriod seconds later).',
  })
  @IsBoolean()
  @ApiPropertyOptional()
  @IsOptional()
  ignoreOldMessages?: boolean;

  @ApiProperty({
    description: 'Process messages from archived chats.',
  })
  @IsBoolean()
  @ApiPropertyOptional()
  @IsOptional()
  processArchive?: boolean;

  @ApiProperty({
    description: 'Turn on/off collecting instance status changing history.',
  })
  @IsBoolean()
  @ApiPropertyOptional()
  @IsOptional()
  instanceStatuses?: boolean;

  @ApiProperty({
    description: 'Turn on/off collecting messages webhooks statuses.',
  })
  @IsBoolean()
  @ApiPropertyOptional()
  @IsOptional()
  webhookStatuses?: boolean;

  @ApiProperty({
    description: 'Turn on/off instance changing status notifications in webhooks.',
  })
  @IsBoolean()
  @ApiPropertyOptional()
  @IsOptional()
  statusNotificationsOn?: boolean;

  @ApiProperty({
    description: 'Delay in seconds between receive request and sending message.',
  })
  @IsNumber()
  @ApiPropertyOptional()
  @IsOptional()
  sendDelay?: number;

  @ApiProperty({
    description: 'Turn on/off dialogs archiving (can slow down instance).',
  })
  @IsBoolean()
  @ApiPropertyOptional()
  @IsOptional()
  disableDialogsArchive?: boolean;

  @ApiProperty({
    description: 'Turn on/off parallel webhook sending.',
  })
  @IsBoolean()
  @ApiPropertyOptional()
  @IsOptional()
  parallelHooks?: boolean;
}
