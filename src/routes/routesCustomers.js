const express = require('express');
const CustomerController = require('../controllers/CustomerController');

/**
 * Class representing the routes for customers.
 */
class CustomerRoutes {


    /**
     * Sets up the customer routes.
     */
    constructor() {
        this.controller = new CustomerController();
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(`/list`, this.controller.list);
        this.router.post(`/create`, this.controller.create);
        this.router.put(`/update/:id`, this.controller.update);
        this.router.delete(`/delete`, this.controller.delete);

        // Middleware to handle 404 errors for customer routes.
        this.router.use(`/*`, (_, res, next) => {
            res.status(404).json({ "message": 'Página não encontrada!' });
        });
    }
}

/**
 * Exports an instance of the CustomerRoutes class.
 * @type {express.Router}
 */
module.exports = new CustomerRoutes().router;
