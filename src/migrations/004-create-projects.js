'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('projects', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
                comment: "Identificador único para cada projeto."
            },
            accountable_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: "Referência ao responsável pelo projeto."
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: "Nome do projeto."
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "Descrição detalhada do projeto."
            },
            value: {
                type: Sequelize.INTEGER,
                allowNull: true,
                comment: "Valor estimado ou custo do projeto."
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: true,
                comment: "Data de início do projeto."
            },
            end_date: {
                type: Sequelize.DATE,
                allowNull: true,
                comment: "Data de término previsto ou real do projeto."
            },
            status: {
                type: Sequelize.ENUM('AT', 'CO', 'CA', 'PE'),
                defaultValue: 'AT',
                allowNull: false,
                comment: "Status atual do projeto [AT-ATIVO] | [CO-CONCLUIDO] | [CA-CANCELADO] | [PE-PENDENTE]."
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

        await queryInterface.addConstraint('projects', {
            fields: ['accountable_id'],
            type: 'foreign key',
            name: 'projects_accountable_id_fk',
            references: {
                table: 'accountables',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('projects', 'projects_accountable_id_fk');

        await queryInterface.dropTable('projects');
    }
};
