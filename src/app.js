require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passport'); // Lógica de autenticação movida para outro arquivo
const { ensureAuthenticated } = require('./middlewares/ensureAuthenticated');
const config = require('./config/config');

const app = express();
const PORT = process.env.PORT || 3000;
const PREFIX = "api"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(`/${PREFIX}`, require('./routes/auth'));
app.use(`/${PREFIX}`, ensureAuthenticated, require('./routes/users'));
app.use(`/${PREFIX}`, ensureAuthenticated, require('./routes/clients'));
app.use(`/${PREFIX}`, ensureAuthenticated, require('./routes/workEntries'));

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/${PREFIX}`);
});

module.exports = server; 