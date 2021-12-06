import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { sessionT } from './sessionT';
import { ReceviedComplaint } from './receviedComplaint';
import { ComplaintImage } from './complaintImage';

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

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sessionId: number;

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
  complaintId: ReceviedComplaint[];

  @BelongsTo(() => sessionT, { foreignKey: 'sessionId' })
  id: sessionT;
  @ForeignKey(() => sessionT)
  @Column({ type: DataType.INTEGER })
  sessionId: string;

  @HasOne(() => ComplaintImage)
  complaintId: ComplaintImage;
}
