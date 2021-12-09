'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('users_subscriptions', {
          id: {
            type: Sequelize.CHAR(36),
            primaryKey: true,
          },
          user_id: {
            type: Sequelize.CHAR(36),
            references: {
              model: {
                tableName: 'user',
              },
              key: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
            allowNull: false,
          },
          subscription_id: {
            type: Sequelize.CHAR(36),
            references: {
              model: {
                tableName: 'subscription',
              },
              key: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
            allowNull: false,
          },
          created_at: Sequelize.DATE
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
      await queryInterface.dropTable('users_subscriptions');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
