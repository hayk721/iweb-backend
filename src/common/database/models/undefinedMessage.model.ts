import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';

/**
 *
 */
tableOptions.tableName = 'undefinedMessage';

@Table(tableOptions)
export class UndefinedMessage extends Model {
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
  })
  fromNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  messageBody: string;

  @Column({
    type: DataType.INTEGER,
  })
  nodeId: number;
}
