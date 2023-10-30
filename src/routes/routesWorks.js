const express = require('express');
const WorkController = require('../controllers/WorkController');

/**
 * Router for work related endpoints.
 */
class WorkRoutes {


    /**
     * Initializes a new instance of the workRouter class.
     */
    constructor() {
        this.controller = new WorkController();
        this.router = express.Router();
        this.initializeRoutes();
    }

    /**
     * Initializes the routes for the work.
     * @param {string} uri - The prefix for the work routes.
     */
    initializeRoutes() {

        this.router.get(`/list`, this.controller.list);
        this.router.get(`/perdate`, this.controller.listPerDate);
        this.router.get(`/list/project/:project_id`, this.controller.getProjectsById);
        this.router.post(`/create`, this.controller.create);
        this.router.delete(`/delete`, this.controller.delete);
        this.router.patch(`/update/:work_id/:project_id`, this.controller.update);

        this.router.use(`/*`, (_, res, next) => {
            res.status(404).json({ "message": 'Página não encontrada!' });
        });
    }
}
/**
 * An instance of the UserRouter's express.Router.
 * @type {express.Router}
 */
module.exports = new WorkRoutes().router;
