import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { SessionT } from './sessionT.model';
import { ReceviedComplaint } from './receviedComplaint.model';
import { ComplaintImage } from './complaintImage.model';

/**
 *
 */
tableOptions.tableName = 'complaint';

@Table(tableOptions)
export class Complaint extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  mobileNumber: string;

  @Column({ type: DataType.STRING, allowNull: true })
  senderName: string;

  @Column({ type: DataType.STRING(15), allowNull: false })
  complaintText: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  readFlag: boolean;

  /**
   * Relations
   */
  @HasMany(() => ReceviedComplaint)
  receviedComplaints: ReceviedComplaint[];

  @BelongsTo(() => SessionT, { foreignKey: 'sessionId' })
  sessionT: SessionT;
  @ForeignKey(() => SessionT)
  @Column({ type: DataType.INTEGER, allowNull: false })
  sessionId: number;

  @HasOne(() => ComplaintImage)
  complaintId: ComplaintImage;
}
