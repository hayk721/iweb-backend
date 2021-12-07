import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { ComplaintsReceiver } from './complaintsReceiver.model';
import { Complaint } from './complaint.model';
/**
 *
 */
tableOptions.tableName = 'receviedComplaint';

@Table(tableOptions)
export class ReceviedComplaint extends Model {
  /**
   * Relations
   */
  @BelongsTo(() => Complaint, { foreignKey: 'complaintId' })
  complaint: Complaint;
  @ForeignKey(() => Complaint)
  @Column({ type: DataType.INTEGER, allowNull: false })
  complaintId: string;

  @BelongsTo(() => ComplaintsReceiver, { foreignKey: 'receiverId' })
  complaintReceiver: ComplaintsReceiver;
  @ForeignKey(() => ComplaintsReceiver)
  @Column({ type: DataType.INTEGER, allowNull: false })
  receiverId: number;
}
