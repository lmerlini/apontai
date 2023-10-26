'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Customer extends Model {

    static associate(models) { }
  }

  Customer.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "O nome não pode estar vazio"
        },
        len: [3, 100]
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Customer',
    tableName: 'customers',
    freezeTableName: true,
    timestamps: true,
    paranoid: true
  });

  return Customer;
};
