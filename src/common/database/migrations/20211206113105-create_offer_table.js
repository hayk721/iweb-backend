'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('offer', {
            id: {
              type: Sequelize.INTEGER.UNSIGNED,
              unique: true,
              autoIncrement: true,
              primaryKey: true
            },
            categoryId: {
              type: Sequelize.INTEGER.UNSIGNED,
              references: {
                model: {
                    tableName: 'offerCategory',
                },
                key: 'id',
              },
              allowNull: false
            },
            offerTitle: {
              type: Sequelize.STRING(500),
              allowNull: false
            },
            offerStartDate: {
              type: Sequelize.DATE,
              allowNull: false
            },
            offerEndDate: {
              type: Sequelize.DATE,
              allowNull: false
            },
            isActive: {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: true
            },
            userCode: {
              type: Sequelize.STRING(4),
              allowNull: true
            },
            secondLangVal: {
              type: Sequelize.STRING,
              allowNull: true
            }},
          { charset: 'utf8', collate: 'utf8_general_ci', transaction: t },
      );
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  down: async (queryInterface) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('offer');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
