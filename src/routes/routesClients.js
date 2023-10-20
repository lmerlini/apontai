const express = require('express');
const ClientsController = require('../controllers/ClientsController');

class ClientsRoutes {

    constructor() {
        this.controller = new ClientsController()
        this.router = express.Router()
        this.initializeRoutes()
    }

    initializeRoutes() {
        const PREFIX = "clients"
        this.router.get(`/${PREFIX}`, (req, res) => this.controller.list(req, res));
        this.router.post(`/${PREFIX}`, (req, res) => this.controller.create(req, res));
        this.router.put(`/${PREFIX}/:id`, (req, res) => this.controller.update(req, res));
        this.router.delete(`/${PREFIX}/softdelete`, (req, res) => this.controller.deleteClients(req, res));
        this.router.delete(`/${PREFIX}/:id`, (req, res) => this.controller.delete(req, res));
                
        this.router.use(`/${PREFIX}/*`, (req, res, next) => {
            res.status(404).json({ "message": 'Página não encontrada!' });
        });
    }

}


module.exports = new ClientsRoutes().router;


