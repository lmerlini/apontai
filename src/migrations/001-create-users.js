'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: "Identificador único para cada usuário."
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Referência para empresa associado ao usuário."
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        comment: "Nome de usuário, deve ser único."
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Primeiro nome do usuário."
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Sobrenome do usuário."
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: "Endereço de e-mail do usuário, deve ser único."
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Senha encriptada do usuário."
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "URL ou caminho para a foto de perfil do usuário."
      },
      role: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "Papel ou função do usuário no sistema."
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: "Indica se o usuário está ativo no sistema."
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "Data e hora do último login do usuário no sistema."
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

    await queryInterface.addConstraint('users', {
      fields: ['company_id'],
      type: 'foreign key',
      name: 'fk_users_companies_id',
      references: {
        table: 'companies',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },
  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeConstraint('users', 'fk_users_companies_id');
    await queryInterface.dropTable('users');
  }
};
