'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('companies', [{
            name: 'Tech Corp',
            nick_name: 'TechCo',
            cnpj: '12345678901234',
            enrollment: '12345',
            phone: '1234567890',
            logo: 'logo.png',
            img: 'img.png',
            country: 'Brasil',
            state: 'SP',
            zipcode: '12345-678',
            city: 'São Paulo',
            street_adreess: 'Rua da Tecnologia',
            street_number: '100',
            complement: 'Sala 200',
            neighborhood: 'Centro'
        }], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('companies', null, {});
    }
};
