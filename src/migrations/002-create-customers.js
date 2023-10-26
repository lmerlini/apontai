'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: "Identificador único para cada cliente."
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        comment: "Nome da empresa cliente."
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Número de telefone da empresa cliente."
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Número do CNPJ da empresa cliente."
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Endereço de e-mail da empresa cliente."
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Endereço da empresa cliente."
      },
      contact: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Nome do contato principal na empresa cliente."
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: "Data e hora de criação do registro."
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: "Data e hora da última atualização do registro."
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "Data e hora de exclusão do registro, caso tenha sido excluído."
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customers');
  }
};
