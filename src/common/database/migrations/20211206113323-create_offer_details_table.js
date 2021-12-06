'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('offerDetails', {
            offerId: {
              type: Sequelize.INTEGER.UNSIGNED,
              unique: true,
              references: {
                model: {
                    tableName: 'offer',
                },
                key: 'id',
              },
              primaryKey: true
            },
            offerDescription: {
              type: Sequelize.STRING(2000),
              allowNull: true
            },
            filePath: {
              type: Sequelize.STRING(2000),
              allowNull: true
            },
            note: {
              type: Sequelize.STRING(500),
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
      await queryInterface.dropTable('offerDetails');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
