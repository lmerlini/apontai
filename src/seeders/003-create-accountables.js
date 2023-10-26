'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('accountables', [
      {
        customer_id: 1, 
        name: 'João Silva',
        position: 'Gerente',
        email: 'joao.silva@example.com',
        phone: '(11) 91234-5678',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customer_id: 2, 
        name: 'Maria Oliveira',
        position: 'Diretora',
        email: 'maria.oliveira@example.com',
        phone: '(11) 92345-6789',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accountables', null, {});
  }
};
