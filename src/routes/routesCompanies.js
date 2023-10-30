const express = require('express');
const CompanyController = require('../controllers/CompanyController.js');

/**
 * Router for user related endpoints.
 */
class Company {

    /**
     * Initializes a new instance of the UserRouter class.
     */
    constructor() {
        this.controller = new CompanyController();
        this.router = express.Router()
        this.initializeRoutes()
    }

    initializeRoutes() {
       
        /**
          * @swagger
          * /companies/list:
          *   get:
          *     security:
          *       - bearerAuth: []         
          *     summary: Get a list of all companies
          *     tags: [Companies]
          *     responses:
          *       201:
          *         description: Company created successfully
          *         content:
          *           application/json:
          *             schema:
          *               type: array
          *               items:
          *                 type: object
          *                 properties:
          *                   id:
          *                     type: integer
          *                   name:
          *                     type: string
          *                   nick_name:
          *                     type: string
          *                   cnpj:
          *                     type: string
          *                   enrollment:
          *                     type: string
          *                   phone:
          *                     type: string
          *                   logo:
          *                     type: string
          *                   img:
          *                     type: string
          *                   country:
          *                     type: string
          *                   state:
          *                     type: string
          *                   zipcode:
          *                     type: string
          *                   city:
          *                     type: string
          *                   street_adreess:
          *                     type: string
          *                   street_number:
          *                     type: string
          *                   complement:
          *                     type: string
          *                   neighborhood:
          *                     type: string
          *                   createdAt:
          *                     type: string
          *                     format: date-time
          *                   updatedAt:
          *                     type: string
          *                     format: date-time
          *                   deletedAt:
          *                     type: string
          *                     format: date-time
          *       200:
          *         description: Returns a list of companies
          *       500:
          *         description: Server error
          */
        this.router.get(`/list`, this.controller.list);

        /**
         * @swagger
         * /companies/create:
         *   post:
         *     security:
         *       - bearerAuth: []         
         *     summary: Create a new company
         *     tags: [Companies]
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
         *       201:
         *         description: Company created successfully
         *       400:
         *         description: Invalid request payload
         *       500:
         *         description: Server error
         */
        this.router.post(`/create`, this.controller.create);

        /**
         * @swagger
         * /companies/delete:
         *   delete:
         *     summary: Delete a company
         *     tags: [Companies]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               companyId:
         *                 type: string
         *     responses:
         *       200:
         *         description: Company deleted successfully
         *       404:
         *         description: Company not found
         *       500:
         *         description: Server error
         */
        this.router.delete(`/delete`, this.controller.delete);

        /**
         * @swagger
         * /companies/update/{id}:
         *   patch:
         *     summary: Update a company by ID
         *     tags: [Companies]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: string
         *         required: true
         *         description: Company ID
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
         *         description: Company updated successfully
         *       400:
         *         description: Invalid request payload
         *       404:
         *         description: Company not found
         *       500:
         *         description: Server error
         */
        this.router.patch(`/update/:id`, this.controller.update);

        this.router.use(`/*`, (_, res, next) => {
            res.status(404).json({ "message": 'Página não encontrada!' });
        });

    }

}

/**
 * An instance of the UserRouter's express.Router.
 * @type {express.Router}
 */
module.exports = new Company().router;
