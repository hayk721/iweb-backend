import { IsUUID } from 'class-validator';

export class SubscriptionDto {
  @IsUUID('4')
  subscriptionId: string;
}
