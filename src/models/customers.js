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
      },
      comment: "Nome da empresa."
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Número de telefone da empresa."
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Número do CNPJ da empresa."
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Insira um endereço de email válido"
        }
      },
      comment: "Endereço de e-mail da empresa."
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "País da empresa."
    },
    state: {
      type: DataTypes.CHAR(2),
      allowNull: true,
      comment: "Estado da empresa."
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Código postal da localidade da empresa."
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Cidade da empresa."
    },
    street_address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Endereço da rua da empresa."
    },
    address_number: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Número do endereço da empresa."
    },
    complement: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Complemento do endereço da empresa (por exemplo, sala, apartamento)."
    },
    neighborhood: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Bairro da empresa."
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Nome do contato principal na empresa."
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
