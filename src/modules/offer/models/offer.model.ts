import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { OfferCategory } from './offerCategory.model';
import { OfferDetails } from './offerDetails.model';

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
    type: DataType.STRING,
    allowNull: false,
  })
  offerTitle: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  offerStartDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  offerEndDate: Date;

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
  @BelongsTo(() => OfferDetails, { foreignKey: 'offerId' })
  offerDetails: OfferDetails;
  @ForeignKey(() => OfferDetails)
  @Column({ type: DataType.INTEGER, allowNull: false })
  offerId: number;

  @BelongsTo(() => OfferCategory, { foreignKey: 'categoryId' })
  offerCategory: OfferCategory;
  @ForeignKey(() => OfferCategory)
  @Column({ type: DataType.INTEGER, allowNull: false })
  categoryId: number;
}
