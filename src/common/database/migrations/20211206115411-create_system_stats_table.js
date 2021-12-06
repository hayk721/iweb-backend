'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('systemStats', {
            dDate: {
              type: Sequelize.DATE,
              primaryKey: false
            },
            whatsappCount: {
              type: Sequelize.INTEGER.UNSIGNED,
              allowNull: false
            },
            whatsappRespons: {
              type: Sequelize.INTEGER.UNSIGNED,
              allowNull: false,
            },
            isLocked: {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: false
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
      await queryInterface.dropTable('systemStats');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
