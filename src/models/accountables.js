'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Accountable extends Model {
        static associate(models) {
            this.belongsTo(models.Customer, {
                foreignKey: 'accountable_id',
                as: 'customer'
            });
        }
    }

    Accountable.init({
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'customers',
                key: 'id',
            },
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            sequelize,
            modelName: 'Accountable',
            tableName: 'accountables',
            freezeTableName: true,
            timestamps: true,
            paranoid: true
        });

    return Accountable;
}
