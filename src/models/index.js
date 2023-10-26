'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require(__dirname + '/../config/config.js')[process.env.NODE_ENV];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const modelFiles = fs.readdirSync(__dirname)
    .filter(file => file.endsWith('.js') && file !== basename && !file.endsWith('.test.js'));

for (const file of modelFiles) {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
}


for (const modelName in db) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
