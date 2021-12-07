import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, IsUUID, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { User } from '../../user/models/user.model';
import { Subscription } from './subscription.model';

/**
 * @description tags model
 */
tableOptions.tableName = 'users_subscriptions';

@Table({ ...tableOptions, updatedAt: false })
export class UsersSubscriptions extends Model {
  @IsUUID('4')
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  public id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(36), allowNull: false })
  userId: string;

  @ForeignKey(() => Subscription)
  @Column({ type: DataType.STRING(36), allowNull: false })
  subscriptionId: string;

  @CreatedAt
  created_at: Date;
}
