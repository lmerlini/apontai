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
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Work'
     */
       /**
     * @swagger
     * /works/perdate:
     *   get:
     *     summary: Get work per date
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
     *               startDate:
     *                 type: string
     *                 format: date
     *                 description: Start date
     *               endDate:
     *                 type: string
     *                 format: date
     *                 description: End date
     *     responses:
     *       200:
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Work'
     *       400:
     *         description: Bad request
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
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Work'
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
     *             $ref: '#/components/schemas/Work'
     *     responses:
     *       200:
     *         description: Work entry created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Work'
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
     *               id:
     *                 type: string
     *                 description: ID of the work entry to delete.
     *                 example: "1"
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
     *             $ref: '#/components/schemas/Work'
     *     responses:
     *       200:
     *         description: Work entry updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Work'
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

/**
 * @swagger
 * components:
 *   schemas:
 *     Work:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *           description: ID of the user
 *         project_id:
 *           type: integer
 *           description: ID of the project
 *         name:
 *           type: string
 *           description: Name of the work entry
 *         service_date:
 *           type: string
 *           format: date
 *           description: Service date
 *         start_time:
 *           type: string
 *           format: time
 *           description: Start time
 *         break_time:
 *           type: integer
 *           description: Break time in seconds
 *         end_time:
 *           type: string
 *           format: time
 *           description: End time
 *         description:
 *           type: string
 *           description: Description of the work entry
 *         status:
 *           type: string
 *           description: Status of the work entry
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Update timestamp
 */
