'use strict';

/**
 * This file is responsible for automatically importing model definitions.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const basename = path.basename(__filename);
const dbInstance = {};

// Filter model files, excluding the current file and test files.
const modelFiles = fs.readdirSync(__dirname)
    .filter(file => file.endsWith('.js') && file !== basename && !file.endsWith('.test.js'));

// For each model file, require it and add the model definition to the db object.
for (const file of modelFiles) {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    dbInstance[model.name] = model;
}

// If the models have any associations, set them up here.
for (const modelName in dbInstance) {
    if (dbInstance[modelName].associate) {
        dbInstance[modelName].associate(dbInstance);
    }
}

// Attach the sequelize instance and class to the db object.
dbInstance.sequelize = sequelize;
dbInstance.Sequelize = Sequelize;

// 
/**
 * Export the db object containing all model definitions.
 * @example 
 * const { User } require('./models')
 * User.findAll()

 * @module dbInstance 
 */
module.exports = dbInstance;
