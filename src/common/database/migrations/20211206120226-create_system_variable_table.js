'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('system_variable', {
            id: {
              type: Sequelize.INTEGER.UNSIGNED,
              unique: true,
              autoIncrement: true,
              primaryKey: true
            },
            varName: {
              type: Sequelize.STRING(30),
              allowNull: false
            },
            varValue: {
              type: Sequelize.STRING(2000),
              allowNull: false,
            },
            secondLangVal: {
              type: Sequelize.STRING(255),
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
      await queryInterface.dropTable('system_variable');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
