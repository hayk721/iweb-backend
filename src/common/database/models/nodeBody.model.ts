import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';

/**
 *
 */
tableOptions.tableName = 'node_body';

@Table(tableOptions)
export class NodeBody extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  nodeId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  optionCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  optionText: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  nextNode: number;

  @Column({
    type: DataType.STRING,
  })
  actionCode: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isDynamic: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  secondLangVal: string;
}
