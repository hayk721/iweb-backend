import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { Offer } from './offer.model';

/**
 *
 */
tableOptions.tableName = 'offerCategory';

@Table(tableOptions)
export class OfferCategory extends Model {
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
  categoryName: string;

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
  @HasMany(() => Offer)
  categoryId: Offer[];
}
