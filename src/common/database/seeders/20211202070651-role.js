'use strict';
const ROLES = [
  {
    id: '59ac9561-1964-4368-a560-11f7697f6852',
    name: 'Admin',
    name__a_r: 'Admin',
    code: '1',
    created_at: new Date(),
  },
  {
    id: '59ac9561-1964-4368-a560-11f7697f6853',
    name: 'ClientSupport',
    name__a_r: 'Client_support',
    code: '2',
    created_at: new Date(),
  },
  {
    id: '59ac9561-1964-4368-a560-11f7697f6854',
    name: 'Sales',
    name__a_r: 'Sales',
    code: '3',
    created_at: new Date(),
  },
];

module.exports = {
  up: async (queryInterface) => {
    console.log('Inserting Roles');
    for (const role of ROLES) {
      await queryInterface.bulkInsert('role', [role], {});
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('role', { code: [1, 2, 3] }, {});
  },
};
