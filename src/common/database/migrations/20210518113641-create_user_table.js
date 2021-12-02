'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
        await queryInterface.createTable('user', {
          id: {
            type: Sequelize.STRING(36),
            primaryKey: true,
          },
          email: {
            validate: {
              isEmail: true,
            },
            unique: true,
            allowNull: true,
            type: Sequelize.STRING,
          },
          role_id: {
            type: Sequelize.STRING,
            references: {
              model: {
                tableName: 'role',
              },
              key: 'id',
            },
            allowNull: false,
          },
          display_name: {
            allowNull: true,
            type: Sequelize.STRING
          },
          avatar: {
            allowNull: true,
            type: Sequelize.TEXT
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          phone: {
            unique: true,
            allowNull: true,
            type: Sequelize.STRING(15),
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
      await queryInterface.dropTable('user');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },
};
