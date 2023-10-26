const express = require('express');
const WorkController = require('../controllers/WorkController');

class WorkRoutes {

    PREFIX = "works"
    constructor() {
        this.controller = new WorkController();
        this.router = express.Router();
        this.initializeRoutes(this.PREFIX);
    }

    initializeRoutes(uri) {

        this.router.get(`/${uri}/list`, (req, res) => this.controller.list(req, res));
        this.router.get(`/${uri}/totalwork`, (req, res) => this.controller.listTotal(req, res));
        this.router.get(`/${uri}/list/:client_id`, (req, res) => this.controller.getClientById(req, res));
        this.router.post(`/${uri}/`, (req, res) => this.controller.create(req, res));
        this.router.delete(`/${uri}`, (req, res) => this.controller.destroy(req, res));
        this.router.patch(`/${uri}`, (req, res) => this.controller.update(req, res));

        this.router.use(`/${uri}/*`, (_, res, next) => {
            res.status(404).json({ "message": 'Página não encontrada!' });
        });
    }
}

module.exports = new WorkRoutes().router;
