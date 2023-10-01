'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // aqui podem ser definidas associações
    }

    // Método para verificar senha
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
  });

  return User;
};