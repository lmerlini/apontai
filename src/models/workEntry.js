'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WorkEntry extends Model {
    static associate(models) {
      this.belongsTo(models.Client, {
        foreignKey: 'client_id',
        as: 'client',
      });
    }
  }

  WorkEntry.init({
    client_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'clients', // nome da tabela de clients
        key: 'id',
      },
      allowNull: false, // dependendo de sua lógica de negócios
    },
    service_date: DataTypes.DATE,
    start_time: DataTypes.TIME,
    pause_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    agenda_description: DataTypes.TEXT,
    daily_total: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'WorkEntry',
  });


  return WorkEntry;
};
