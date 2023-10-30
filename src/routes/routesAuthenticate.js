const express = require('express');
const AuthController = require('../controllers/AuthController');

/**
 * Class representing the authentication routes.
 */
class Authenticate {


    /**
     * Sets up the authentication routes.
     */
    constructor() {
        this.controller = new AuthController();
        this.router = express.Router();
        this.initializeRoutes();
    }


    initializeRoutes() {
        this.router.post(`/login`, this.controller.login);
        this.router.post(`/verify-token`, this.controller.verifyToken);
        this.router.post(`/refresh-token`, this.controller.refreshToken);        
        this.router.post(`/logout`, this.controller.logout);

        this.router.use(`/*`, (_, res) => {
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
