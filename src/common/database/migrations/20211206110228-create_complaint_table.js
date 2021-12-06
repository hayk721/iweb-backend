'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('complaint', {
            id: {
              type: Sequelize.INTEGER.UNSIGNED,
              unique: true,
              autoIncrement: true,
              primaryKey: true
            },
            sessionId: {
              type: Sequelize.INTEGER.UNSIGNED,
              allowNull: false
            },
            mobileNumber: {
              type: Sequelize.STRING(12),
              allowNull: false
            },
            senderName: {
              type: Sequelize.STRING,
              allowNull: true
            },
            complaintText: {
              type: Sequelize.STRING(2000),
              allowNull: false
            },
            readFlag: {
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
      await queryInterface.dropTable('complaint');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
