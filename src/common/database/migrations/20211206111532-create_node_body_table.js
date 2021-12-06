'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('node_body', {
            id: {
              type: Sequelize.INTEGER.UNSIGNED,
              unique: true,
              autoIncrement: true,
              primaryKey: true
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
              type: Sequelize.STRING(50),
              allowNull: false,
            },
            optionText: {
              type: Sequelize.STRING(1000),
              allowNull: false
            },
            nextNode: {
              type: Sequelize.INTEGER.UNSIGNED,
              allowNull: true,
            },
            actionCode: {
              type: Sequelize.INTEGER.UNSIGNED,
              allowNull: true,
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
      await queryInterface.dropTable('node_body');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
