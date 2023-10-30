const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Log extends Model { }

    Log.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        method: {
            type: DataTypes.STRING,
            allowNull: true
        },
        queryParams: {
            type: DataTypes.JSON,
            allowNull: true
        },
        requestBody: {
            type: DataTypes.JSON,
            allowNull: true
        },
        userAgent: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: true
        },
        referrer: {
            type: DataTypes.STRING,
            allowNull: true
        },
        errorMessage: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        stackTrace: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        memoryUsage: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        cpuLoad: {
            type: DataTypes.STRING,
            allowNull: true
        },
        environment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        appVersion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        externalApiData: {
            type: DataTypes.JSON,
            allowNull: true
        },
        dbQueryDetails: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'Log',
        tableName: 'logs',
        paranoid: false
    });

    return Log;
};
