const express = require('express');
const CustomerController = require('../controllers/CustomerController');

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: Operations related to customers
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

    /**
     * @swagger
     * /customers/list:
     *   get:
     *     summary: Get a list of customers
     *     tags: [Customer]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Successful operation
     */
    /**
     * @swagger
     * /customers/create:
     *   post:
     *     summary: Create a new customer
     *     tags: [Customer]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *     responses:
     *       200:
     *         description: Customer created successfully
     *       400:
     *         description: Bad request
     */
    /**
     * @swagger
     * /customers/update/{id}:
     *   put:
     *     summary: Update a customer
     *     tags: [Customer]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the customer to update
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Customer updated successfully
     *       400:
     *         description: Bad request
     */
    /**
     * @swagger
     * /customers/delete:
     *   delete:
     *     summary: Delete a customer
     *     tags: [Customer]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: string
     *     responses:
     *       200:
     *         description: Customer deleted successfully
     *       400:
     *         description: Bad request
     */
    initializeRoutes() {
        this.router.get(`/list`, this.controller.list);
        this.router.post(`/create`, this.controller.create);
        this.router.put(`/update/:id`, this.controller.update);
        this.router.delete(`/delete`, this.controller.delete);

        // Middleware to handle 404 errors for customer routes.
        this.router.use(`/*`, (_, res, next) => {
            next({ message: 'Pagina não encontrada', status: 404 })
        });
    }
}

/**
 * Exports an instance of the CustomerRoutes class.
 * @type {express.Router}
 */
module.exports = new CustomerRoutes().router;
