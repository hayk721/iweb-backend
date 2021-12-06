'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('transitions', {
            id: {
              type: Sequelize.INTEGER.UNSIGNED,
              unique: true,
              autoIncrement: true,
              primaryKey: true
            },
            sessionId: {
              type: Sequelize.INTEGER.UNSIGNED,
              allowNull: true
            },
            fromNode: {
              type: Sequelize.INTEGER.UNSIGNED,
              allowNull: true,
            },
            toNode: {
              type: Sequelize.INTEGER.UNSIGNED,
              allowNull: false
            },
            customerResponse: {
              type: Sequelize.STRING(1000),
              allowNull: false
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,},
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
      await queryInterface.dropTable('transitions');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
