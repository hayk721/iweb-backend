'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { hashSync, genSaltSync } = require('bcrypt');
// eslint-disable-next-line @typescript-eslint/no-var-requires

const ADMIN = [
  {
    display_name: 'Admin',
    email: 'admin@gmail.com',
    phone: '5565656565',
    created_at: new Date(),
  },
];
const salt = genSaltSync(12);
const hash = hashSync('Iwap222!', salt);

module.exports = {
  up: async (queryInterface) => {
    const role = (await queryInterface.sequelize.query(`select * from role where name = 'Admin'`)).shift().shift();
    if (!role) throw Error(`Role with name Admin not found`);
    console.log('Inserting Admin');
    for (const admin of ADMIN) {
      await queryInterface.bulkInsert(
        'user',
        [
          {
            ...admin,
            id: '59ac9561-1964-4368-a578-11f7697f6852',
            password: hash,
            role_id: role.id,
          },
        ],
        {},
      );
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('user', { id: '59ac9561-1964-4368-a578-11f7697f6852' }, {});
  },
};
