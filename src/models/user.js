'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize').Model} */
module.exports = (sequelize) => {
  class User extends Model {

    static associate(models) {
      this.hasMany(models.Work, { foreignKey: 'user_id', as: 'works' }); // ajustado aqui
    }

    async isValidPassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashedPassword);
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    freezeTableName: true,
    timestamps: true,
    paranoid: true
  });

  return User;
};
