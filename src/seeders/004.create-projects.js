'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('projects', [
            {
                accountable_id: 1, // Referência ao responsável com ID 1 na tabela accountables
                name: 'Projeto Exemplo 1',
                description: 'Descrição detalhada do projeto exemplo 1.',
                value: 1000,
                start_date: new Date('2023-01-01'),
                end_date: new Date('2023-12-31'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                accountable_id: 1,
                name: 'Projeto Exemplo 2',
                description: 'Descrição detalhada do projeto exemplo 2.',
                value: 2000,
                start_date: new Date('2023-02-01'),
                end_date: new Date('2023-10-31'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                accountable_id: 2,
                name: 'Projeto Exemplo 2',
                description: 'Descrição detalhada do projeto exemplo 2.',
                value: 2000,
                start_date: new Date('2023-02-01'),
                end_date: new Date('2023-10-31'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('projects', null, {});
    }
};
