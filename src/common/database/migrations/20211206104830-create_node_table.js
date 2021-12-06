'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('node', {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
            },
            nodeCode: {
              type: Sequelize.STRING(20),
              allowNull: false,
            },
            nodeDesc: {
              allowNull: false,
              type: Sequelize.STRING(255),
            },
            isStart: {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: false
            },
            isEnd: {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: false
            },
            isDynamic: {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: false
            },
            secondLangVal: {
              type: Sequelize.STRING,
              allowNull: true
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
      await queryInterface.dropTable('node');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
