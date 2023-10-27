const express = require('express');
const WorkController = require('../controllers/WorkController');

/**
 * Router for work related endpoints.
 */
class WorkRoutes {

    PREFIX = "works"

    /**
     * Initializes a new instance of the workRouter class.
     */
    constructor() {
        this.controller = new WorkController();
        this.router = express.Router();
        this.initializeRoutes(this.PREFIX);
    }

    /**
     * Initializes the routes for the work.
     * @param {string} uri - The prefix for the work routes.
     */
    initializeRoutes(uri) {

        this.router.get(`/${uri}/list`, (req, res) => this.controller.list(req, res));
        this.router.get(`/${uri}/perdate`, (req, res) => this.controller.listPerDate(req, res));
        this.router.get(`/${uri}/list/project/:project_id`, (req, res) => this.controller.getProjectsById(req, res));
        this.router.post(`/${uri}/create`, (req, res) => this.controller.create(req, res));
        this.router.delete(`/${uri}/delete`, (req, res) => this.controller.destroy(req, res));
        this.router.patch(`/${uri}/update/:work_id/:project_id`, (req, res) => this.controller.update(req, res));

        this.router.use(`/${uri}/*`, (_, res, next) => {
            res.status(404).json({ "message": 'Página não encontrada!' });
        });
    }
}
/**
 * An instance of the UserRouter's express.Router.
 * @type {express.Router}
 */
module.exports = new WorkRoutes().router;
