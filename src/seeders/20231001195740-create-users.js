'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'administrator',
      password:  bcrypt.hashSync('admin', 10),
      email: 'administrator@example.com',
      first_name:'first_name',
      last_name:'last_name',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
