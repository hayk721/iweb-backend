import { Table, Column, Model, DataType, BelongsTo, ForeignKey, IsUUID } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { User } from '../../user/models/user.model';

tableOptions.tableName = 'auth_email_verification';
@Table(tableOptions)
export class EmailVerification extends Model {
  @IsUUID('4')
  @Column({
    type: DataType.STRING(36),
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  public id: string;

  @BelongsTo(() => User, { foreignKey: 'userId' })
  user: User;
  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(36), allowNull: false })
  userId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;
  @Column({ type: DataType.STRING, allowNull: false })
  token: string;
  /**
   * TWO_FACTOR_AUTHENTICATION_STATUS
   */
  @Column({ type: DataType.TINYINT({ length: 1 }), allowNull: false, defaultValue: 0 })
  status: number;
}
