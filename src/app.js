/**
 * Module dependencies.
 * @description Application entry point
 */
require('./config/globals')
require('dotenv').config();
const express = require('express');
const errorHandler = require('./middlewares/errors/errorHandler');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passport');
const { ensureAuthenticated } = require('./middlewares/ensureAuthenticated');
const cors = require('cors');


const specs = require('../swagger')
const swaggerUi = require('swagger-ui-express');

/**
 * Create Express application.
 */
const app = express();

/**
 * Application settings.
 */
const PORT = process.env.PORT;
const PREFIX = process.env.PREFIX_NAME;

/**
 * Set up CORS middleware.
 * Allows web applications on other domains to make requests to the application.
 * @description pay close attention to the origin, in production make the correction
 */
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ?? '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

/**
 * Set up body-parsing middleware.
 * Allows the application to parse incoming request bodies.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Set up session middleware.
 * Allows the application to track users as they navigate through the site.
 */
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',  // TODO: Ensure HTTPS is used in production
        maxAge: 1000 * 60 * 60 * 24
    }
}));

/**
 * Initialize Passport authentication middleware.
 */
app.use(passport.initialize());
app.use(passport.session());

/**
 * Application routes.
 */
app.use(`/${PREFIX}/docs`, swaggerUi.serve, swaggerUi.setup(specs));
app.use(`/${PREFIX}/auth`, require('./routes/routesAuthenticate'));
app.use(`/${PREFIX}/companies`, ensureAuthenticated, require('./routes/routesCompanies'))
app.use(`/${PREFIX}/users`, ensureAuthenticated, require('./routes/routesUsers'));
app.use(`/${PREFIX}/customers`, ensureAuthenticated, require('./routes/routesCustomers'));
app.use(`/${PREFIX}/works`, ensureAuthenticated, require('./routes/routesWorks'));
app.use(`/${PREFIX}/costs`, ensureAuthenticated, require('./routes/routesCosts'));
app.use(`/${PREFIX}/projects`, ensureAuthenticated, require('./routes/routesProjects'))
app.use(`/${PREFIX}/accountables`, ensureAuthenticated, require('./routes/routesAccountables.js'))



app.use(errorHandler);

/**
 * Start the server.
 */
const server = app.listen(PORT, () => {
    if (process.env.NODE_ENV == 'development') {
        console.log(`Server is running on http://localhost:${PORT}/${PREFIX}`);
    } else {
        console.log(`Server is running on production https://localhost:${PORT}/${PREFIX}`);
    }
});


/**
 * Export the server for using ins tests
 */
module.exports = server;
