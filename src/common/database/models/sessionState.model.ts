import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';

/**
 *
 */
tableOptions.tableName = 'systemStats';

@Table(tableOptions)
export class SystemStats extends Model {
  @Column({
    type: DataType.DATE,
    unique: true,
    primaryKey: true,
  })
  dDate: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  whatsappCount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  whatsappRespons: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isLocked: boolean;
}
