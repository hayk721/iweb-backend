'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('offerCategory', {
            id: {
              type: Sequelize.INTEGER.UNSIGNED,
              unique: true,
              autoIncrement: true,
              primaryKey: true
            },
            categoryName: {
              type: Sequelize.STRING(500),
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
      await queryInterface.dropTable('offerCategory');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
