import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { ComplaintsReceiver } from './complaintsReceiver';
import { Complaint } from './complaint';
/**
 *
 */
tableOptions.tableName = 'receviedComplaint';

@Table(tableOptions)
export class ReceviedComplaint extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  complaintId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  receiverId: number;

  /**
   * Relations
   */
  @BelongsTo(() => Complaint, { foreignKey: 'complaintId' })
  id: Complaint;
  @ForeignKey(() => Complaint)
  @Column({ type: DataType.INTEGER })
  complaintId: string;

  @BelongsTo(() => ComplaintsReceiver, { foreignKey: 'receiverId' })
  id: ComplaintsReceiver;
  @ForeignKey(() => ComplaintsReceiver)
  @Column({ type: DataType.INTEGER })
  receiverId: string;
}
