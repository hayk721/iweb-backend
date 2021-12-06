import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { Offer } from './offer';
/**
 *
 */
tableOptions.tableName = 'offerDetails';

@Table(tableOptions)
export class OfferDetails extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    allowNull: false,
  })
  offerId: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  offerDescription: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  filePath: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  note: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: true,
  })
  secondLangVal: boolean;

  /**
   * Relations
   */
  @BelongsTo(() => Offer, { foreignKey: 'offerId' })
  id: Offer;
  @ForeignKey(() => Offer)
  @Column({ type: DataType.INTEGER })
  offerId: string;
}
