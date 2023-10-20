const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class WorkEntry extends Model {
    static associate(models) {
      this.belongsTo(models.Client, {
        foreignKey: 'client_id',
        as: 'client',
      });
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }

    get daily_total() {
      const start = new Date(`1970-01-01T${this.start_time}Z`);
      const end = new Date(`1970-01-01T${this.end_time}Z`);
      const breakDurationMs = this.break_duration * 60 * 1000;
      return new Date(end - start - breakDurationMs).toISOString().substr(11, 8);
    }
  }

  WorkEntry.init({
    client_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'clients',
        key: 'id',
      },
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    service_date: DataTypes.DATE,
    start_time: DataTypes.TIME,
    break_duration: DataTypes.INTEGER,
    end_time: DataTypes.TIME,
    agenda_description: DataTypes.TEXT

  }, {
    sequelize,
    modelName: 'WorkEntry',
  });

  return WorkEntry;
};
