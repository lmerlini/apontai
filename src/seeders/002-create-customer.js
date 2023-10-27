'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('customers', [
      {
        name: 'Empresa ABC',
        phone: '1122334455',
        cnpj: '12.345.678/0001-90',
        contact: 'João Silva',
        email: 'joao.silva@empresaabc.com',
        country: 'Brasil',
        state: 'SP',
        zip_code: '12345-000',
        city: 'São Paulo',
        street_address: 'Rua das Flores',
        address_number: '123',
        complement: 'Apto 101',
        neighborhood: 'Centro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Empresa XYZ',
        phone: '9988776655',
        cnpj: '98.765.432/0001-10',
        contact: 'Maria Pereira',
        email: 'maria.pereira@empresaxyz.com',
        country: 'Brasil',
        state: 'RJ',
        zip_code: '98765-000',
        city: 'Rio de Janeiro',
        street_address: 'Rua das Árvores',
        address_number: '456',
        complement: 'Sala 301',
        neighborhood: 'Lapa',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customers', null, {});
  }
};
