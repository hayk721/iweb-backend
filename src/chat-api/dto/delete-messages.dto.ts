import { IsString, IsUUID } from 'class-validator';
import { IsMessageId } from '@common/decorators/is-messageId.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteMessagesDto {
  @IsUUID('4')
  subscriptionId: string;

  @ApiProperty({
    description: 'Message ID from messages history. Example: "false_6590996758@c.us_3EB03104D2B84CEAD82F"',
  })
  @IsMessageId()
  @IsString()
  messageId?: string;
}
