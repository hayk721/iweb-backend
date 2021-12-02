'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn('user', 'id', {
        type: Sequelize.STRING('36'),
      })
      await queryInterface.createTable(
        'fcm_notifications',
        {
          id: {
            type: Sequelize.STRING('36'),
            primaryKey: true,
          },
          token: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
          },
          user_id: {
            type: Sequelize.STRING(36),
            references: {
              model: 'user',
              key: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
            allowNull: false,
          },
          created_at: Sequelize.DATE,
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
      await queryInterface.dropTable('fcm_notifications');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },
};
