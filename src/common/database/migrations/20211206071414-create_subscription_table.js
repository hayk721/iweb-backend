'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('subscription', {
            id: {
              type: Sequelize.STRING(36),
              primaryKey: true,
            },
            channel_type: {
              allowNull: false,
              type: Sequelize.STRING,
            },
            channel_api: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            channel_token: {
              allowNull: false,
              type: Sequelize.STRING
            },
            channel_webhook: {
              allowNull: true,
              type: Sequelize.TEXT
            },
            is_active: {
              allowNull: true,
              type: Sequelize.BOOLEAN,
            },
            subscription_start: Sequelize.DATE,
            subscription_end: Sequelize.DATE,},
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
      await queryInterface.dropTable('subscription');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
