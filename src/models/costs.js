'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Costs extends Model {
    static associate(models) {
      this.belongsTo(models.Work, {
        foreignKey: 'work_id',
        as: 'work'
      });
    }
  }

  Costs.init({
    work_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    receipt: DataTypes.STRING,
    value: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Costs',
    tableName: 'costs',
    freezeTableName: true,
    paranoid: true,
    timestamps: true
  });
  return Costs;
};