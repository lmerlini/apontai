'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('costs', [
            {
                work_id: 1,
                name: 'Despesa de Transporte',
                receipt: 'comprovante001.jpg',
                value: 100,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                work_id: 2, 
                name: 'Despesa de Alimentação',
                receipt: 'comprovante002.jpg',
                value: 50,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('costs', null, {});
    }
};
