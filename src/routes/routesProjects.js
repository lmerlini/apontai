const express = require('express');
const ProjectController = require('../controllers/ProjectController');

/**
 * Router for Project related endpoints.
 */
class ProjectRoutes {

    constructor() {
        this.controller = new ProjectController();
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {

        this.router.get(`/list`, this.controller.list);
        this.router.post(`/create`, this.controller.create);
        this.router.delete(`/delete`, this.controller.delete);
        this.router.patch(`/update/:project_id`, this.controller.update);

        this.router.use(`/*`, (_, res, next) => {
            res.status(404).json({ "message": 'Página não encontrada!' });
        });
    }
}
/**
 * An instance of the ProjectRoutes's express.Router.
 * @type {express.Router}
 */
module.exports = new ProjectRoutes().router;
