'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Work extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
      this.belongsTo(models.Project, {
        foreignKey: 'project_id',
        as: 'project',
      });
    }

    get daily_total() {
      const start = new Date(`1970-01-01T${this.start_time}Z`);
      const end = new Date(`1970-01-01T${this.end_time}Z`);
      const breakDurationMs = timeToMilliseconds(this.break_time)
      return new Date(end - start - breakDurationMs).toISOString().substr(11, 8);
    }
  }
  function timeToMilliseconds(timeString) {
    const parts = timeString.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);

    return (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
  }

  Work.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'projects',
        key: 'id',
      },
      allowNull: false,
    },
    name: DataTypes.STRING,
    service_date: DataTypes.DATE,
    start_time: DataTypes.TIME,
    break_time: DataTypes.INTEGER,
    end_time: DataTypes.TIME,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE    

  }, {
    sequelize,
    modelName: 'Work',
    tableName: 'works',
    freezeTableName: true,
    timestamps: true,
    paranoid: true
  });

  return Work;
};
