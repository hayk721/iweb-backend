import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';

/**
 *
 */
tableOptions.tableName = 'system_variable';

@Table(tableOptions)
export class SystemVariables extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  varName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  varValue: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  secondLangVal: string;
}
