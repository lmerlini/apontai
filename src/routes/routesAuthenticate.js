const express = require('express');
const AuthController = require('../controllers/AuthController');

class Authenticate {

    constructor() {
        this.controller = new AuthController()
        this.router = express.Router()
        this.initializeRoutes()
    }

    initializeRoutes() {
        const PREFIX = "auth";
        
        this.router.post(`/${PREFIX}/login`, (req, res, next) => this.controller.login(req, res, next));
        this.router.post(`/${PREFIX}/verify-token`, (req, res, next) => this.controller.verifyToken(req, res, next));
        this.router.post(`/${PREFIX}/refresh-token`, (req, res, next) => this.controller.refreshToken(req, res, next));
        this.router.post(`/${PREFIX}/register`, (req, res, next) => this.controller.register(req, res, next));
        this.router.post(`/${PREFIX}/logout`, (req, res, next) => this.controller.logout(req, res, next));

        this.router.use(`/${PREFIX}/*`, (_, res) => {
            res.status(404).json({ "message": 'Página não encontrada!' });
            return
        });
    }

}


module.exports = new Authenticate().router;
