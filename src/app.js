require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passport');
const { ensureAuthenticated } = require('./middlewares/ensureAuthenticated');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT
const PREFIX = process.env.PREFIX_NAME

app.use(cors());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(`/${PREFIX}`, require('./routes/routesAuthenticate'));

app.use(`/${PREFIX}`, ensureAuthenticated, require('./routes/routesUsers'));
app.use(`/${PREFIX}`, ensureAuthenticated, require('./routes/routesClients'));
app.use(`/${PREFIX}`, ensureAuthenticated, require('./routes/routesWorks'));


const server = app.listen(PORT, () => {
    if (process.env.NODE_ENV == 'development') {
        console.log(`Server is running on http://localhost:${PORT}/${PREFIX}`);
    }
});

module.exports = server; 