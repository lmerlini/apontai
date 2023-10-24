const express = require('express');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController')

class UserRouter {

    constructor() {
        this.controller = new UserController();
        this.authController = new AuthController()
        this.router = express.Router()

        this.initializeRoutes()
    }

    initializeRoutes() {
        const PREFIX = "users"
        this.router.get(`/${PREFIX}/list`, (req, res, next) => this.controller.getAllUsers(req, res, next));
        this.router.delete(`/${PREFIX}/delete`, (req, res) => this.controller.deleteUser(req, res));
        this.router.get(`/${PREFIX}/me`, (req, res) => this.authController.getCurrentUser(req, res))

        this.router.use(`/${PREFIX}/*`, (_, res, next) => {
            res.status(404).json({ "message": 'Página não encontrada!' });
        });

    }

}




module.exports = new UserRouter().router;
