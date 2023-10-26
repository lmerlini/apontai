const express = require('express');
const CustomerController = require('../controllers/CustomerController');

/**
 * Class representing the routes for customers.
 */
class CustomerRoutes {

    PREFIX = "customers";

    /**
     * Sets up the customer routes.
     */
    constructor() {
        this.controller = new CustomerController();
        this.router = express.Router();
        this.initializeRoutes(this.PREFIX);
    }

    /**
     * Initializes customer-related routes.
     * @param {string} uri - The URI prefix for customer routes.
     */
    initializeRoutes(uri) {
        this.router.get(`/${uri}`, (req, res) => this.controller.list(req, res));
        this.router.post(`/${uri}`, (req, res) => this.controller.create(req, res));
        this.router.put(`/${uri}/:id`, (req, res) => this.controller.update(req, res));
        this.router.delete(`/${uri}/softdelete`, (req, res) => this.controller.deleteClients(req, res));
        this.router.delete(`/${uri}/:id`, (req, res) => this.controller.delete(req, res));

        // Middleware to handle 404 errors for customer routes.
        this.router.use(`/${uri}/*`, (req, res, next) => {
            res.status(404).json({ "message": 'Página não encontrada!' });
        });
    }
}

/**
 * Exports an instance of the CustomerRoutes class.
 * @type {express.Router}
 */
module.exports = new CustomerRoutes().router;
