import { Table, Column, Model, DataType, IsUUID } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';

tableOptions.tableName = 'password_reset';

@Table({ ...tableOptions, updatedAt: false })
export class PasswordReset extends Model {
  @IsUUID('4')
  @Column({
    type: DataType.STRING(36),
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  public id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  token: string;
}
