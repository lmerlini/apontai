'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WorkEntries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clients', 
          key: 'id',
        },
        allowNull: false
      },
      service_date: {
        type: Sequelize.DATE
      },
      start_time: {
        type: Sequelize.TIME
      },
      break_duration: { // Renomeado e tipo modificado
        type: Sequelize.INTEGER
      },
      end_time: {
        type: Sequelize.TIME
      },
      agenda_description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WorkEntries');
  }
};
