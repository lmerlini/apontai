const express = require('express');
const WorkEntryController = require('../controllers/WorkEntryController');

class WorkEntryRoutes {

    constructor() {
        this.controller = new WorkEntryController();
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        const PREFIX = "workentries";

        this.router.get(`/${PREFIX}/list`, (req, res) => this.controller.list(req, res));
        this.router.get(`/${PREFIX}/totalwork`, (req, res) => this.controller.listTotal(req, res));
        this.router.get(`/${PREFIX}/list/:client_id`, (req, res) => this.controller.getClientById(req, res));
        this.router.post(`/${PREFIX}/`, (req, res) => this.controller.create(req, res));
        this.router.delete(`/${PREFIX}`, (req, res) => this.controller.destroy(req, res));
        this.router.patch(`/${PREFIX}`, (req, res) => this.controller.update(req, res));

        this.router.use(`/${PREFIX}/*`, (_, res, next) => {
            res.status(404).json({ "message": 'Página não encontrada!' });
        });
    }
}

module.exports = new WorkEntryRoutes().router;
