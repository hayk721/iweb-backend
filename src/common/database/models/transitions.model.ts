import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';

/**
 *
 */
tableOptions.tableName = 'transitions';

@Table(tableOptions)
export class Transitions extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sessionId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  fromNode: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  toNode: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  customerResponse: string;
}
