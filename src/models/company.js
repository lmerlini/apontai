'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Company extends Model {
    static associate(models) {
      // associations can be defined herea
    }
  }

  Company.init({
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
    nick_name: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    enrollment: DataTypes.STRING,
    phone: DataTypes.STRING,
    logo: DataTypes.STRING,
    img: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.CHAR,
    zipcode: DataTypes.STRING,
    city: DataTypes.STRING,
    street_adreess: DataTypes.STRING,
    street_number: DataTypes.STRING,
    complement: DataTypes.STRING,
    neighborhood: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
    tableName: 'companies',
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
  });

  return Company;
};
