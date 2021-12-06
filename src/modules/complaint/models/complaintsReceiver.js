import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { ReceviedComplaint } from './receviedComplaint';

/**
 *
 */
tableOptions.tableName = 'complaintReceiver';

@Table(tableOptions)
export class ComplaintsReceiver extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mobileNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  receiverName: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  isActive: boolean;

  /**
   * Relations
   */
  @HasMany(() => ReceviedComplaint)
  receiverId: ReceviedComplaint[];
}
