const express = require('express');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController')

/**
 * Router for user related endpoints.
 */
class UserRouter {


    /**
     * Initializes a new instance of the UserRouter class.
     */
    constructor() {
        this.controller = new UserController();
        this.authController = new AuthController()
        this.router = express.Router()
        this.initializeRoutes()
    }

    initializeRoutes() {

        /**
         * @swagger
         * /users/me:
         *   get:
         *     tags: [Users]
         *     summary: Retrieve the currently logged in user's information
         *     security:
         *       - bearerAuth: []
         *     responses:
         *       200:
         *         description: User information retrieved successfully
         *         content:
         *           application/json:
         *             schema:
         *               properties:
         *                 company_id:
         *                   type: int
         *                 username:
         *                   type: string                   
         *                 first_name:
         *                   type: string             
         *                 last_name:
         *                   type: string 
         *                 email:
         *                   type: string 
         *                 photo:
         *                   type: string 
         *                 is_active:
         *                   type: boolean 
         *       401:
         *         description: Unauthorized
         *       500:
         *         description: Server error
         */
        this.router.get(`/me`, this.authController.getCurrentUser)
      
        /**
         * @swagger
         * /users/create:
         *   post:
         *     tags: [Users]
         *     summary: Create a new user
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *               properties:
         *                 company_id:
         *                   type: int
         *                 username:
         *                   type: string                   
         *                 first_name:
         *                   type: string             
         *                 last_name:
         *                   type: string 
         *                 email:
         *                   type: string 
         *                 photo:
         *                   type: string 
         *                 is_active:
         *                   type: boolean          
         *     responses:
         *       201:
         *         description: User created successfully
         *       400:
         *         description: Invalid request payload
         *       500:
         *         description: Server error
         */
        this.router.post(`/create`, this.controller.create);

        /**
         * @swagger
         * /users/delete:
         *   delete:
         *     tags: [Users]
         *     summary: Delete a user
         *     parameters:
         *       - name: userId
         *         in: query
         *         required: true
         *         description: The ID of the user to delete
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: User deleted successfully
         *       404:
         *         description: User not found
         *       500:
         *         description: Server error
         */
        this.router.delete(`/delete`, this.controller.delete);

        this.router.use(`/*`, (_, res, next) => {
            next({ message: 'Pagina não encontrada', status: 404 })
        });

    }

}

/**
 * An instance of the UserRouter's express.Router.
 * @type {express.Router}
 */
module.exports = new UserRouter().router;
