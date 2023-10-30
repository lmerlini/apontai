'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('logs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                comment: "ID do usuário autenticado no momento do erro."
            },
            method: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: "Método HTTP da solicitação."
            },
            queryParams: {
                type: Sequelize.JSON,
                allowNull: true,
                comment: "Parâmetros de consulta da URL."
            },
            requestBody: {
                type: Sequelize.JSON,
                allowNull: true,
                comment: "Dados do corpo do pedido."
            },
            userAgent: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: "Agente do usuário do cliente."
            },
            ip: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: "Endereço IP do cliente."
            },
            referrer: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: "URL de referência, se disponível."
            },
            errorMessage: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "Mensagem descritiva do erro."
            },
            stackTrace: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "Pilha de chamadas relacionadas ao erro."
            },
            memoryUsage: {
                type: Sequelize.INTEGER,
                allowNull: true,
                comment: "Uso de memória no momento do erro."
            },
            cpuLoad: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: "Carga do CPU no momento do erro."
            },
            environment: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: "Ambiente em que o erro ocorreu (ex: 'desenvolvimento', 'produção')."
            },
            appVersion: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: "Versão da aplicação no momento do erro."
            },
            externalApiData: {
                type: Sequelize.JSON,
                allowNull: true,
                comment: "Detalhes sobre interações com APIs externas, se aplicável."
            },
            dbQueryDetails: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "Detalhes da consulta ao banco de dados relacionada ao erro."
            },
            timestamp: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                comment: "Horário exato em que o erro ocorreu."
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
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('logs');
    }
};
