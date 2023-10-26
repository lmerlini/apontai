const express = require('express');
const AuthController = require('../controllers/AuthController');

/**
 * Class representing the authentication routes.
 */
class Authenticate {

    /**
     * Prefix for authentication routes.
     * @type {string}
     */
    PREFIX = "auth";

    /**
     * Sets up the authentication routes.
     */
    constructor() {
        /**
         * Instance of the AuthController.
         * @type {AuthController}
         */
        this.controller = new AuthController();

        /**
         * Express router for authentication routes.
         * @type {express.Router}
         */
        this.router = express.Router();

        this.initializeRoutes(this.PREFIX);
    }

    /**
     * Initializes authentication-related routes.
     * @param {string} uri - The URI prefix for authentication routes.
     */
    initializeRoutes(uri) {
        this.router.post(`/${uri}/login`, (req, res, next) => this.controller.login(req, res, next));
        this.router.post(`/${uri}/verify-token`, (req, res, next) => this.controller.verifyToken(req, res, next));
        this.router.post(`/${uri}/refresh-token`, (req, res, next) => this.controller.refreshToken(req, res, next));
        this.router.post(`/${uri}/register`, (req, res, next) => this.controller.register(req, res, next));
        this.router.post(`/${uri}/logout`, (req, res, next) => this.controller.logout(req, res, next));

        // Middleware to handle 404 errors for authentication routes.
        this.router.use(`/${uri}/*`, (_, res) => {
            res.status(404).json({ "message": 'Página não encontrada!' });
            return;
        });
    }

}

/**
 * Exports an instance of the Authenticate class.
 * @type {express.Router}
 */
module.exports = new Authenticate().router;
