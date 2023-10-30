const express = require('express');
const CostController = require('../controllers/CostController');

/**
 * Router for work related endpoints.
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

    initializeRoutes() {
        this.router.get(`/list`, this.controller.list);
        this.router.post(`/create`, this.controller.create);
        this.router.delete(`/delete`, this.controller.delete);
        this.router.patch(`/update/:work_id`, this.controller.update);

        this.router.use(`/*`, (_, res, next) => {
            res.status(404).json({ "message": 'Página não encontrada!' });
        });
    }
}
/**
 * An instance of the UserRouter's express.Router.
 * @type {express.Router}
 */
module.exports = new CostsRoutes().router;
