const express = require('express');
const CustomerController = require('../controllers/CustomerController');

class CustomerRoutes {

    PREFIX = "customers"
    constructor() {
        this.controller = new CustomerController()
        this.router = express.Router()
        this.initializeRoutes(this.PREFIX)
    }

    initializeRoutes(uri) {
        this.router.get(`/${uri}`, (req, res) => this.controller.list(req, res));
        this.router.post(`/${uri}`, (req, res) => this.controller.create(req, res));
        this.router.put(`/${uri}/:id`, (req, res) => this.controller.update(req, res));
        this.router.delete(`/${uri}/softdelete`, (req, res) => this.controller.deleteClients(req, res));
        this.router.delete(`/${uri}/:id`, (req, res) => this.controller.delete(req, res));

        this.router.use(`/${uri}/*`, (req, res, next) => {
            res.status(404).json({ "message": 'Página não encontrada!' });
        });
    }

}


module.exports = new CustomerRoutes().router;


