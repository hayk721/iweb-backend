'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('undefinedMessage', {
            id: {
              type: Sequelize.INTEGER.UNSIGNED,
              unique: true,
              autoIncrement: true,
              primaryKey: true
            },
            fromNumber: {
              type: Sequelize.STRING(15),
              allowNull: false
            },
            messageBody: {
              type: Sequelize.STRING(1000),
              allowNull: false
            },
            nodeId: {
              type: Sequelize.INTEGER,
              references: {
                model: {
                    tableName: 'node',
                },
                key: 'id',
              },
              allowNull: true,
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
      await queryInterface.dropTable('undefinedMessage');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
