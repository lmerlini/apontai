const express = require('express');
const CostController = require('../controllers/CostController');

/**
 * @swagger
 * tags:
 *   name: Costs
 *   description: Operations related to costs
 */
class CostsRoutes {

    /**
     * Initializes a new instance of the CostsRouter class.
     */
    constructor() {
        this.controller = new CostController();
        this.router = express.Router();
        this.initializeRoutes();
    }

    /**
     * @swagger
     * /costs/list:
     *   get:
     *     summary: Get a list of costs
     *     description: Retrieve a list of costs.
     *     tags:
     *       - Costs
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Successful operation
     */
    /**
     * @swagger
     * /costs/create:
     *   post:
     *     summary: Create a new cost
     *     description: Create a new cost.
     *     tags:
     *       - Costs
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Successful operation
     */
    /**
     * @swagger
     * /costs/delete:
     *   delete:
     *     summary: Delete a cost
     *     description: Delete a cost.
     *     tags:
     *       - Costs
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Successful operation
     */
    /**
     * @swagger
     * /costs/update/{work_id}:
     *   patch:
     *     summary: Update a cost
     *     description: Update a cost.
     *     tags:
     *       - Costs
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: work_id
     *         required: true
     *         description: ID of the work to update.
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Successful operation
     */
    initializeRoutes() {
        this.router.get(`/list`, this.controller.list);
        this.router.post(`/create`, this.controller.create);
        this.router.delete(`/delete`, this.controller.delete);
        this.router.patch(`/update/:work_id`, this.controller.update);

        this.router.use(`/*`, (_, res, next) => {
            next({ message: 'Pagina não encontrada', status: 404 })
        });
    }
}

/**
 * An instance of the UserRouter's express.Router.
 * @type {express.Router}
 */
module.exports = new CostsRoutes().router;
