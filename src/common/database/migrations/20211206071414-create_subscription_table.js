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
            type: {
              allowNull: false,
              type: Sequelize.STRING,
            },
            instance_id: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            api_key: {
              allowNull: false,
              type: Sequelize.STRING
            },
            webhook: {
              allowNull: true,
              type: Sequelize.TEXT
            },
            is_active: {
              allowNull: true,
              type: Sequelize.BOOLEAN,
              default: false
            },
            subscription_start: {
              type: Sequelize.DATE,
              allowNull: false,
            },
            subscription_end: {
              type: Sequelize.DATE,
              allowNull: false,
            },
         },
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
