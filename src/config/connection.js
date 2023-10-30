const Sequelize = require('sequelize');
const config = require('./config')[process.env.NODE_ENV];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize.addHook('afterQuery', (sql, options) => {
    global.lastExecutedQuery = {
        sql: {
            type: sql.type,
            sql: sql.sql
        }
    };
});

module.exports = sequelize;
