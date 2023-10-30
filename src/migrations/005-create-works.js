'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('works', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
                comment: "Identificador único para cada trabalho."
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: "Referência ao usuário relacionado ao trabalho."
            },
            project_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: "Referência ao projeto relacionado ao trabalho."
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: "Nome do trabalho."
            },
            service_date: {
                type: Sequelize.DATE,
                allowNull: true,
                comment: "Data do serviço realizado."
            },
            start_time: {
                type: Sequelize.TIME,
                allowNull: true,
                comment: "Hora de início do trabalho."
            },
            break_time: {
                type: Sequelize.TIME,
                allowNull: true,
                comment: "Tempo de pausa durante o trabalho."
            },
            end_time: {
                type: Sequelize.TIME,
                allowNull: true,
                comment: "Hora de término do trabalho."
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "Descrição detalhada do trabalho."
            },
            status: {
                type: Sequelize.ENUM('AT', 'CO', 'CA', 'PE'),
                defaultValue: 'AT',
                allowNull: false,
                comment: "[AT-ATIVO] | [CO-CONCLUIDO] | [CA-CANCELADO] | [PE-PENDENTE]"
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
                comment: "Data de exclusão do registro (se excluído)."
            }
        });

        await queryInterface.addConstraint('works', {
            fields: ['project_id'],
            type: 'foreign key',
            name: 'fk_works_project_id',
            references: {
                table: 'projects',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        await queryInterface.addConstraint('works', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'fk_works_user_id',
            references: {
                table: 'users',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint('works', 'fk_works_project_id');
        await queryInterface.removeConstraint('works', 'fk_works_user_id');

        await queryInterface.dropTable('works');
    }
};
