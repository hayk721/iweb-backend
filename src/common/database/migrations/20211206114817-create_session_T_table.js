'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('sessionT', {
            id: {
              type: Sequelize.INTEGER,
              unique: true,
              autoIncrement: true,
              primaryKey: true
            },
            mobileNumber: {
              type: Sequelize.STRING(12),
              allowNull: false
            },
            isLocked: {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: false
            },
            slides: {
              type: Sequelize.INTEGER,
              allowNull: false,
            },
            senderName: {
              type: Sequelize.STRING(255),
              allowNull: true
            },
            sessionLang: {
              type: Sequelize.STRING(2),
              allowNull: false
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
      await queryInterface.dropTable('sessionT');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
