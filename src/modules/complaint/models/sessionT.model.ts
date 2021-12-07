import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { Complaint } from './complaint.model';

/**
 *
 */
tableOptions.tableName = 'sessionT';

@Table(tableOptions)
export class SessionT extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  mobileNumber: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isLocked: boolean;

  @Column({ type: DataType.INTEGER, allowNull: false })
  slides: string;

  @Column({ type: DataType.STRING, allowNull: true })
  senderName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  sessionLang: string;

  @HasMany(() => Complaint)
  complaints: Complaint[];
}
