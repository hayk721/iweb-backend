'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('body', {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
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
            optionCode: {
              type: Sequelize.STRING(5),
              allowNull: false,
            },
            optionText: {
              allowNull: false,
              type: Sequelize.TEXT,
            },
            nextNode: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            actionCode: {
                type: Sequelize.INTEGER,
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
      await queryInterface.dropTable('body');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
