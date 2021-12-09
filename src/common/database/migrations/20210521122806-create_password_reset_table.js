'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('password_reset', {
        id: {
          type: Sequelize.CHAR(36),
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        token: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: Sequelize.DATE,},
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
      await queryInterface.dropTable('password_reset');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },
};
