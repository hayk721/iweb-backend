import { Table, Column, Model, IsUUID, DataType, HasMany } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { User } from '../../models/user.model';

tableOptions.tableName = 'role';
@Table(tableOptions)
export class Role extends Model {
  @IsUUID('4')
  @Column({
    type: DataType.STRING(36),
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name_AR: string;

  @Column({ type: DataType.INTEGER, autoIncrement: true, allowNull: false, unique: true })
  code: number;

  @HasMany(() => User)
  users: User[];
}
