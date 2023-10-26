const express = require('express');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController')

/**
 * Router for user related endpoints.
 */
class UserRouter {

    /** 
     * @property {string} PREFIX - The prefix used for the user routes.
     */
    PREFIX = "users"

    /**
     * Initializes a new instance of the UserRouter class.
     */
    constructor() {
        this.controller = new UserController();
        this.authController = new AuthController()
        this.router = express.Router()
        this.initializeRoutes(this.PREFIX)
    }

    /**
     * Initializes the routes for the user.
     * @param {string} uri - The prefix for the user routes.
     */
    initializeRoutes(uri) {
        /**
         * Retrieves a list of all users.
         */
        this.router.get(`/${uri}/list`, (req, res) => this.controller.getAllUsers(req, res));
        /**
         *  Deletes a specific user.
         */
        this.router.delete(`/${uri}/delete`, (req, res) => this.controller.deleteUser(req, res));
        /**
         * Retrieves the currently authenticated user.
         */
        this.router.get(`/${uri}/me`, (req, res) => this.authController.getCurrentUser(req, res))

        /**
         * Default route that captures all non-defined user routes and returns a 404.
         */
        this.router.use(`/${uri}/*`, (_, res, next) => {
            res.status(404).json({ "message": 'Página não encontrada!' });
        });

    }

}

/**
 * An instance of the UserRouter's express.Router.
 * @type {express.Router}
 */
module.exports = new UserRouter().router;
