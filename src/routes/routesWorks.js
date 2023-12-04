const express = require('express');
const WorkController = require('../controllers/WorkController');

/**
 * @swagger
 * tags:
 *   name: Work
 *   description: Operations related to work
 */
class WorkRoutes {

    /**
     * Initializes a new instance of the WorkRouter class.
     */
    constructor() {
        this.controller = new WorkController();
        this.router = express.Router();
        this.initializeRoutes();
    }

    /**
     * @swagger
     * /works/list:
     *   get:
     *     summary: Get a list of work
     *     tags: [Work]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Successful operation
     */
    /**
     * @swagger
     * /works/perdate:
     *   get:
     *     summary: Get work per date
     *     tags: [Work]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Successful operation
     */
    /**
     * @swagger
     * /works/list/project/{project_id}:
     *   get:
     *     summary: Get work by project ID
     *     tags: [Work]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: project_id
     *         required: true
     *         description: ID of the project to get work for.
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Successful operation
     */
    /**
     * @swagger
     * /works/create:
     *   post:
     *     summary: Create new work entry
     *     tags: [Work]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               // Define properties based on your work model
     *     responses:
     *       200:
     *         description: Work entry created successfully
     *       400:
     *         description: Bad request
     */
    /**
     * @swagger
     * /works/delete:
     *   delete:
     *     summary: Delete work entry
     *     tags: [Work]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               // Define properties based on your work model
     *     responses:
     *       200:
     *         description: Work entry deleted successfully
     *       400:
     *         description: Bad request
     */
    /**
     * @swagger
     * /works/update/{work_id}/{project_id}:
     *   patch:
     *     summary: Update work entry
     *     tags: [Work]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: work_id
     *         required: true
     *         description: ID of the work entry to update.
     *         schema:
     *           type: string
     *       - in: path
     *         name: project_id
     *         required: true
     *         description: ID of the project for the work entry.
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               // Define properties based on your work model
     *     responses:
     *       200:
     *         description: Work entry updated successfully
     *       400:
     *         description: Bad request
     */
    initializeRoutes() {
        this.router.get(`/list`, this.controller.list);
        this.router.get(`/perdate`, this.controller.listPerDate);
        this.router.get(`/list/project/:project_id`, this.controller.getProjectsById);
        this.router.post(`/create`, this.controller.create);
        this.router.delete(`/delete`, this.controller.delete);
        this.router.patch(`/update/:work_id/:project_id`, this.controller.update);

        this.router.use(`/*`, (_, res, next) => {
            next({ message: 'Pagina não encontrada', status: 404 })
        });
    }
}

/**
 * An instance of the WorkRouter's express.Router.
 * @type {express.Router}
 */
module.exports = new WorkRoutes().router;
