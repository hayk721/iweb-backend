'use strict';
const { hashSync, genSaltSync } = require('bcrypt');
const Op = require("sequelize");

const ADMIN = [
  {
    display_name: 'Admin',
    email: 'admin@gmail.com',
    role: '59ac9561-1964-4368-a560-11f7697f6852,
    phone: '5565656565',
  },
];

module.exports = {
  up: async (queryInterface) => {
    const salt = genSaltSync(12);
    const hash = hashSync('Iwap222!', salt);
    console.log('Inserting Admin');
    for (const admin of ADMIN) {
      await queryInterface.bulkInsert('user', [{
        display_name: admin.display_name.toLowerCase(),
        phone: admin.phone,
        password: hash,
        email: admin.email,
        role: admin.role,
      }], {});
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('user', {email: 'admin@gmail.com'}, {})
  }
};
