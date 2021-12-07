import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';

/**
 *
 */
tableOptions.tableName = 'actions';

@Table(tableOptions)
export class Actions extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  actionCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: false,
  })
  actionDesc: string;
}
