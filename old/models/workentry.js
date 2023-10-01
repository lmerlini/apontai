'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WorkEntry.init({
    client_id: DataTypes.INTEGER,
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