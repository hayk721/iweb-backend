import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { Complaint } from './complaint';

/**
 *
 */
tableOptions.tableName = 'complaintImage';

@Table(tableOptions)
export class ComplaintImage extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
  })
  complaintId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imageUrl: string;

  @Column({ type: DataType.STRING, allowNull: false })
  imageName: string;

  /**
   * Relations
   */
  @BelongsTo(() => Complaint, { foreignKey: 'complaintId' })
  id: Complaint;
  @ForeignKey(() => Complaint)
  @Column({ type: DataType.INTEGER })
  complaintId: number;
}
