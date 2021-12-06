'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('complaintImage', {
            complaintId: {
              type: Sequelize.INTEGER.UNSIGNED,
              primaryKey: true,
              references: {
                model: {
                  tableName: 'complaint',
                },
                key: 'id',
              },
              allowNull: false
            },
            imageUrl: {
              type: Sequelize.STRING(1000),
              allowNull: false
            },
            imageName: {
              type: Sequelize.STRING,
              allowNull: false
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
      await queryInterface.dropTable('complaintImage');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};
