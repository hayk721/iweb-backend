'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('outMessages', {
            id: {
              type: Sequelize.INTEGER,
              unique: true,
              autoIncrement: true,
              primaryKey: true
            },
            mobileNumber: {
              type: Sequelize.STRING(20),
              allowNull: false
            },
            textMessage: {
              type: Sequelize.STRING(2000),
              allowNull: false
            },
            isSent: {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: false
            },
            note: {
              type: Sequelize.STRING(255),
              allowNull: true
            },
            source: {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: true
            },
            status: {
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
      await queryInterface.dropTable('outMessages');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
