'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Clients', [{
      name: 'Empresa ABC',
      phone: '1122334455',
      cnpj: '12.345.678/0001-90',
      responsible: 'João Silva',
      email: 'joao.silva@empresaabc.com',
      hourrate: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Empresa XYZ',
      phone: '9988776655',
      cnpj: '98.765.432/0001-10',
      responsible: 'Maria Pereira',
      email: 'maria.pereira@empresaxyz.com',
      hourrate: 60,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Clients', null, {});
  }
};
