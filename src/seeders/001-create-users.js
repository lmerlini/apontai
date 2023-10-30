'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.bulkInsert('users', [
      {
        company_id: 1,
        username: 'administrator',
        password: bcrypt.hashSync('admin', 10),
        email: 'administrator@example.com',
        first_name: 'User',
        last_name: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_id: 1,
        username: 'admin',
        password: bcrypt.hashSync('admin', 10),
        email: 'luis.merlini@example.com',
        first_name: 'Luis',
        last_name: 'Merlini',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  down: (queryInterface, _) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
