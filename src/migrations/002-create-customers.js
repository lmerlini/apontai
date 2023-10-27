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
        comment: "Identificador único para cada."
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        comment: "Nome da empresa."
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Número de telefone da empresa."
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Número do CNPJ da empresa."
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Endereço de e-mail da empresa."
      },
      country: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: "País da empresa."
      },
      state: {
        type: Sequelize.CHAR(2),
        allowNull: true,
        comment: "Estado da empresa."
      },
      zip_code: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "Código postal da localidade da empresa."
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: "Cidade da empresa."
      },
      street_address: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Endereço da rua da empresa."
      },
      address_number: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: "Número do endereço da empresa."
      },
      complement: {
        type: Sequelize.STRING(50),
        allowNull: true,
        comment: "Complemento do endereço da empresa (por exemplo, sala, apartamento)."
      },
      neighborhood: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: "Bairro da empresa."
      },
      contact: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Nome do contato principal na empresa."
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
