'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('role', {
        id: {
          type: Sequelize.STRING(36),
          primaryKey: true,
        },
        name: Sequelize.STRING,
        name__a_r: Sequelize.STRING,
        code: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          unique: true,
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
      await queryInterface.dropTable('role');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },
};
