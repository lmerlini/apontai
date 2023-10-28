const express = require('express');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController')

/**
 * Router for user related endpoints.
 */
class UserRouter {

    /**
     * Initializes a new instance of the UserRouter class.
     */
    constructor() {
        this.controller = new UserController();
        this.authController = new AuthController()
        this.router = express.Router()
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.get(`/list`, this.controller.list);
        this.router.post(`/create`, this.controller.create);
        this.router.delete(`/delete`, this.controller.delete);
        this.router.get(`/me`, this.authController.getCurrentUser)
        this.router.use(`/*`, (_, res, next) => {
            res.status(404).json({ "message": 'Página não encontrada!' });
        });

    }

}

/**
 * An instance of the UserRouter's express.Router.
 * @type {express.Router}
 */
module.exports = new UserRouter().router;
