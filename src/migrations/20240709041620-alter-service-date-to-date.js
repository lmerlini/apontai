'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('works', 'service_date', {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment: "Data do serviço realizado (sem horas)."
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn('works', 'service_date', {
            type: Sequelize.DATE,
            allowNull: true,
            comment: "Data do serviço realizado."
        });
    }
};
