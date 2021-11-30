'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "user", deps: []
 *
 **/

var info = {
  revision: 1,
  name: 'create_user_table',
  created: '2021-06-09T08:26:29.510Z',
  comment: '',
};

var migrationCommands = [
  {
    fn: 'createTable',
    params: [
      'user',
      {
        id: {
          validate: {
            isUUID: '4',
          },
          primaryKey: true,
          unique: true,
          allowNull: false,
          type: Sequelize.UUID,
        },
        email: {
          validate: {
            isEmail: true,
          },
          unique: true,
          allowNull: true,
          type: Sequelize.STRING,
        },
        name: {
          allowNull: true,
          type: Sequelize.STRING(60),
        },
        surname: {
          allowNull: true,
          type: Sequelize.STRING(20),
        },
        name_ar: {
          allowNull: true,
          type: Sequelize.STRING(60),
        },
        surname_ar: {
          allowNull: true,
          type: Sequelize.STRING(20),
        },
        password: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        mobile: {
          unique: true,
          allowNull: true,
          type: Sequelize.STRING(15),
        },
        lang: {
          type: Sequelize.ENUM(['en', 'ar']),
          allowNull: false,
          defaultValue: 'ar',
        },
        is_mobile_verified: {
          allowNull: true,
          type: Sequelize.BOOLEAN,
        },
        is_logged_out: {
          allowNull: true,
          type: Sequelize.BOOLEAN,
        },
        is_suspend: {
          allowNull: true,
          type: Sequelize.BOOLEAN,
        },
        last_login_date: {
          allowNull: true,
          type: Sequelize.DATE,
        },
        last_log_out_date: {
          allowNull: true,
          type: Sequelize.DATE,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: true,
          type: Sequelize.DATE,
        },
      },
      {},
    ],
  },
];

var rollbackCommands = [
  {
    fn: 'dropTable',
    params: ['user'],
  },
];

module.exports = {
  pos: 0,
  up: async function (queryInterface, Sequelize) {
    var index = this.pos;
    return new Promise(function (resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index];
          console.log('[#' + index + '] execute: ' + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        } else resolve();
      }
      next();
    });
  },
  down: async function (queryInterface, Sequelize) {
    var index = this.pos;
    return new Promise(function (resolve, reject) {
      function next() {
        if (index < rollbackCommands.length) {
          let command = rollbackCommands[index];
          console.log('[#' + index + '] execute: ' + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        } else resolve();
      }
      next();
    });
  },
  info: info,
};
