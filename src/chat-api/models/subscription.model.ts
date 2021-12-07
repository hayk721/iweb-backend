import { BelongsToMany, Column, DataType, IsUUID, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { User } from '../../user/models/user.model';
import { UsersSubscriptions } from './users-subscriptions-pivot.model';

/**
 * @description tags model
 */
tableOptions.tableName = 'subscription';

@Table({ ...tableOptions, updatedAt: false, createdAt: false })
export class Subscription extends Model {
  @IsUUID('4')
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  public id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  apiKey: string;

  @Column({ type: DataType.STRING, allowNull: false })
  instanceId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  webhook: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isActive: boolean;

  @BelongsToMany(() => User, () => UsersSubscriptions)
  users: User[];

  @Column({ type: DataType.DATE, allowNull: false })
  subscriptionStart: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  subscriptionEnd: Date;
}
