import { BelongsTo, Column, DataType, ForeignKey, IsUUID, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { UserModel } from '../../user/models/user.model';

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

  @BelongsTo(() => UserModel, { foreignKey: 'userId' })
  user: UserModel;
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.STRING(36), allowNull: false })
  userId: string;
}
