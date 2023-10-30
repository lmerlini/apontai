'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('costs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: "Identificador único para cada despesa."
      },
      work_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Nome da despesa."
      },
      receipt: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "Comprovante da despesa."
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Valor da despesa."
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
    })

    await queryInterface.addConstraint('costs', {
      fields: ['work_id'],
      type: 'foreign key',
      name: 'fk_costs_work_id',
      references: {
        table: 'works',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('costs', 'fk_costs_work_id');
    await queryInterface.dropTable('costs');

  }
};
