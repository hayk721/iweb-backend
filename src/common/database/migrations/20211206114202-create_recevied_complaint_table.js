'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('receviedComplaint', {
            id: {
              type: Sequelize.INTEGER,
              unique: true,
              autoIncrement: true,
              primaryKey: true
            },
            complaintId: {
              type: Sequelize.INTEGER.UNSIGNED,
              references: {
                model: {
                    tableName: 'complaint',
                },
                key: 'id',
              },
              allowNull: false
            },
            receiverId: {
              type: Sequelize.INTEGER.UNSIGNED,
              references: {
                model: {
                    tableName: 'complaintReceiver',
                },
                key: 'id',
              },
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
      await queryInterface.dropTable('receviedComplaint');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};

