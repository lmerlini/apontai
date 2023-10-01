'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {

    static associate(models) {
      // define association here
    }
  }
  Client.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "O nome não pode estar vazio"
        }
      },
      len: {
        args: [3, 100],
        msg: "O nome deve contér no mínimo 3 caracter"
      }
    },
    phone: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    responsible: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Insira um endereço de email válido"
        }
      }
    },
    hourrate: {
      type: DataTypes.INTEGER
    },

  }, {
    sequelize,
    modelName: 'Client',
  });

  return Client;
};