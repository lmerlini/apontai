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

    /**
     * @swagger
     * /projects/list:
     *   get:
     *     summary: Get a list of projects
     *     tags:
     *       - Projects
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Successful operation
     */
    /**
     * @swagger
     * /projects/create:
     *   post:
     *     summary: Create a new project
     *     tags:
     *       - Projects
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
     *               description:
     *                 type: string
     *     responses:
     *       200:
     *         description: Project created successfully
     *       400:
     *         description: Bad request
     */
    /**
     * @swagger
     * /projects/delete:
     *   delete:
     *     summary: Delete a project
     *     tags:
     *       - Projects
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               project_id:
     *                 type: string
     *     responses:
     *       200:
     *         description: Project deleted successfully
     *       400:
     *         description: Bad request
     */
    /**
     * @swagger
     * /projects/update/{project_id}:
     *   patch:
     *     summary: Update a project
     *     tags:
     *       - Projects
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: project_id
     *         required: true
     *         description: ID of the project to update.
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Project updated successfully
     *       400:
     *         description: Bad request
     */
    initializeRoutes() {
        this.router.get(`/list`, this.controller.list);
        this.router.post(`/create`, this.controller.create);
        this.router.delete(`/delete`, this.controller.delete);
        this.router.patch(`/update/:project_id`, this.controller.update);

        this.router.use(`/*`, (_, res, next) => {
            next({ message: 'Pagina não encontrada', status: 404 })
        });
    }
}

/**
 * An instance of the ProjectRoutes's express.Router.
 * @type {express.Router}
 */
module.exports = new ProjectRoutes().router;
