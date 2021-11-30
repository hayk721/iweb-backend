import { BelongsTo, Column, DataType, ForeignKey, IsUUID, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { User } from '../../user/models/user.model';

/**
 *
 */
tableOptions.tableName = 'fcm_notifications';

@Table({ ...tableOptions, updatedAt: false })
export class FcmNotification extends Model {
  @IsUUID('4')
  @Column({
    type: DataType.STRING(36),
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  public id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  token: string;

  /**
   * Relations
   */

  @BelongsTo(() => User, { foreignKey: 'userId' })
  user: User;
  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(36), allowNull: false })
  userId: string;
}
