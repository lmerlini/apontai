const express = require('express');
const AuthController = require('../controllers/AuthController');

/**
 * @swagger
 * tags:
 *   name: Authenticate
 *   description: Operations related to Authenticate
 */
class Authenticate {

    /**
     * Sets up the authentication routes.
     */
    constructor() {
        this.controller = new AuthController();
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        /**
         * @swagger
         * /auth/login:
         *   post:
         *     summary: Log in a user
         *     tags: [Authenticate]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               username:
         *                 type: string
         *               password:
         *                 type: string
         *     responses:
         *       200:
         *         body: Successful login
         *       400:
         *         description: Invalid credentials
         */
        this.router.post(`/login`, this.controller.login);

        /**
         * @swagger
         * /auth/verify-token:
         *   post:
         *     summary: Verify JWT token
         *     tags: [Authenticate]
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: header
         *         name: Authorization
         *         schema:
         *           type: string
         *         required: true
         *         description: JWT token
         *     responses:
         *       200:
         *         description: Token is valid
         *       400:
         *         description: Invalid token
         */
        this.router.post(`/verify-token`, this.controller.verifyToken);

        /**
         * @swagger
         * /auth/refresh-token:
         *   post:
         *     summary: Refresh JWT token
         *     tags: [Authenticate]
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: header
         *         name: Authorization
         *         schema:
         *           type: string
         *         required: true
         *         description: JWT token          
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - refresh_token
         *             properties:
         *               refresh_token:
         *                 type: string
         *                 description: The refresh token
         *     responses:
         *       200:
         *         description: New token generated
         *       400:
         *         description: Invalid request
         */
        this.router.post(`/refresh-token`, this.controller.refreshToken);

        /**
        * @swagger
        * /auth/logout:
        *   post:
        *     summary: Log out a user
        *     tags: [Authenticate]
        *     security:
        *       - bearerAuth: []
        *     parameters:
        *       - in: header
        *         name: Authorization
        *         schema:
        *           type: string
        *         required: true
        *         description: JWT token
        *     responses:
        *       200:
        *         description: Successfully logged out
        *       401:
        *         description: Unauthorized
        */
        this.router.post(`/logout`, this.controller.logout);


        this.router.use(`/*`, (_, res) => {
            next({ message: 'Pagina não encontrada', status: 404 })
        });
    }

}

/**
 * Exports an instance of the Authenticate class.
 * @type {express.Router}
 */
module.exports = new Authenticate().router;
