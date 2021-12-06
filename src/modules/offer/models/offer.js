import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { OfferCategory } from './offerCategory';

/**
 *
 */
tableOptions.tableName = 'offer';

@Table(tableOptions)
export class Offer extends Model {
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
    allowNull: false,
  })
  categoryId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  offerTitle: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  offerStartDate: date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  offerEndDate: date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  secondLangVal: string;

  /**
   * Relations
   */
  @BelongsTo(() => offerDetails, { foreignKey: 'offerId' })
  id: offerDetails;
  @ForeignKey(() => offerDetails)
  @Column({ type: DataType.INTEGER })
  offerId: string;

  @BelongsTo(() => OfferCategory, { foreignKey: 'categoryId' })
  id: OfferCategory;
  @ForeignKey(() => OfferCategory)
  @Column({ type: DataType.INTEGER })
  categoryId: string;
}
