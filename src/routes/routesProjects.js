const express = require('express');
const ProjectController = require('../controllers/ProjectController');

/**
 * Router for Project related endpoints.
 */
class ProjectRoutes {

    PREFIX = "projects"

    constructor() {
        this.controller = new ProjectController();
        this.router = express.Router();
        this.initializeRoutes(this.PREFIX);
    }

    /**
     * Initializes the routes for the Project.
     * @param {string} uri - The prefix for the Project routes.
     */
    initializeRoutes(uri) {

        this.router.get(`/${uri}/list`, (req, res) => this.controller.list(req, res));
        this.router.post(`/${uri}/create`, (req, res) => this.controller.create(req, res));
        this.router.delete(`/${uri}/delete`, (req, res) => this.controller.delete(req, res));
        this.router.patch(`/${uri}/update/:project_id/:accountable_id`, (req, res) => this.controller.update(req, res));

        this.router.use(`/${uri}/*`, (_, res, next) => {
            res.status(404).json({ "message": 'Página não encontrada!' });
        });
    }
}
/**
 * An instance of the ProjectRoutes's express.Router.
 * @type {express.Router}
 */
module.exports = new ProjectRoutes().router;
