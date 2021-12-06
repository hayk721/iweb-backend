import { Column, DataType, IsUUID, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';

/**
 *
 */
tableOptions.tableName = 'subscription';

@Table(tableOptions)
export class Subscription extends Model {
  @IsUUID('4')
  @Column({
    type: DataType.STRING(36),
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  public id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  channel_type: string;

  @Column({ type: DataType.STRING, allowNull: false })
  channel_api: string;

  @Column({ type: DataType.STRING, allowNull: false })
  channel_token: string;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  is_active: boolean;

  @Column({ type: DataType.DATE })
  subscription_start: Date;

  @Column({ type: DataType.DATE })
  subscription_end: Date;
}
