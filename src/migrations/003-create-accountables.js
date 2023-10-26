'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('accountables', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
                comment: "Identificador único para cada responsável."
            },
            customer_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: "Referência ao cliente associado ao responsável."
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: "Nome completo do responsável."
            },
            position: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: "Cargo ou posição do responsável."
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: "Endereço de e-mail do responsável."
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: "Número de telefone do responsável."
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                comment: "Data e hora de criação do registro."
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
                comment: "Data e hora da última atualização do registro."
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                comment: "Data e hora de exclusão do registro, caso tenha sido excluído."
            }
        });

        await queryInterface.addConstraint('accountables', {
            fields: ['customer_id'],
            type: 'foreign key',
            name: 'accountables_customer_id_fk',
            references: {
                table: 'customers',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('accountables', 'accountables_customer_id_fk');
        await queryInterface.dropTable('accountables');
    }
};
