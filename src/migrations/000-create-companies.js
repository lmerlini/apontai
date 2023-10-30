'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('companies', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: Sequelize.STRING(255),
            nick_name: Sequelize.STRING(100),
            cnpj: Sequelize.STRING,
            enrollment: Sequelize.STRING,
            phone: Sequelize.STRING,
            logo: Sequelize.STRING,
            img: Sequelize.STRING,
            country: Sequelize.STRING(100),
            state: Sequelize.CHAR(2),
            zipcode: Sequelize.STRING,
            city: Sequelize.STRING(100),
            street_adreess: Sequelize.STRING(255),
            street_number: Sequelize.STRING(100),
            complement: Sequelize.STRING(50),
            neighborhood: Sequelize.STRING(100),
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                comment: "Data de exclusão do registro (se excluído)."
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('companies');
    }
};
