const express = require('express');
const AccountableController = require('../controllers/AccountableController');

/**
 * @swagger
 * tags:
 *   name: Accountables
 *   description: Operations related to Accountable
 */
class AccountableRoutes {

    /**
     * Initializes a new instance of the Accountable class.
     */
    constructor() {
        this.controller = new AccountableController();
        this.router = express.Router();
        this.initializeRoutes();
    }

    /**
    * @swagger
    * /accountables/list/:
    *   post:
    *     summary: Get a list of accountables
    *     tags:
    *       - Accountables
    *     security:
    *       - bearerAuth: []
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               accountableID:
    *                 type: string
    *                 description: The ID of the accountable to filter by
    *     responses:
    *       200:
    *         description: Successful operation
    */
    initializeRoutes() {
        debugger

        this.router.post(`/list`, this.controller.list);

        this.router.use(`/*`, (_, res, next) => {
            next({ message: 'Pagina não encontrada', status: 404 });
        });
    }
}

/**
 * An instance of the Accountable's express.Router.
 * @type {express.Router}
 */
module.exports = new AccountableRoutes().router;
