'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('complaintReceiver', {
            id: {
              type: Sequelize.INTEGER.UNSIGNED,
              unique: true,
              autoIncrement: true,
              primaryKey: true
            },
            mobileNumber: {
              type: Sequelize.STRING(12),
              allowNull: false
            },
            receiverName: {
              type: Sequelize.STRING,
              allowNull: true
            },
            isActive: {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: true
            }},
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
      await queryInterface.dropTable('complaintReceiver');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
