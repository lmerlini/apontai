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
         * /companies/search:
         *   get:
         *     security:
         *       - bearerAuth: []                  
         *     summary: Search for companies based on query parameters
         *     tags: [Companies]
         *     parameters:
         *       - in: query
         *         name: name
         *         schema:
         *           type: string
         *         required: false
         *         description: Search by company name
         *       - in: query
         *         name: nick_name
         *         schema:
         *           type: string
         *         required: false
         *         description: Search by company nickname
         *       - in: query
         *         name: cnpj
         *         schema:
         *           type: string
         *         required: false
         *         description: Search by company CNPJ
         *       - in: query
         *         name: phone
         *         schema:
         *           type: string
         *         required: false
         *         description: Search by company phone number
         *       - in: query
         *         name: city
         *         schema:
         *           type: string
         *         required: false
         *         description: Search by company city
         *       - in: query
         *         name: neighborhood
         *         schema:
         *           type: string
         *         required: false
         *         description: Search by company neighborhood                        
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
         *       400:
         *         description: Bad request if search criteria are invalid
         *       500:
         *         description: Server error          
         */
        this.router.get(`/search`, this.controller.search);

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
         *                 description: The name of the company.
         *               nick_name:
         *                 type: string
         *                 description: The nickname of the company.
         *               cnpj:
         *                 type: string
         *                 description: The CNPJ number of the company.
         *               enrollment:
         *                 type: string
         *                 description: The enrollment number of the company.
         *               phone:
         *                 type: string
         *                 description: The phone number of the company.
         *               logo:
         *                 type: string
         *                 description: URL to the company's logo.
         *               img:
         *                 type: string
         *                 description: URL to the company's image.
         *               country:
         *                 type: string
         *                 description: The country where the company is located.
         *               state:
         *                 type: string
         *                 description: The state where the company is located.
         *               zipcode:
         *                 type: string
         *                 description: The postal code for the company's address.
         *               city:
         *                 type: string
         *                 description: The city where the company is located.
         *               street_adreess:
         *                 type: string
         *                 description: The street address of the company.
         *               street_number:
         *                 type: string
         *                 description: The street number of the company's address.
         *               complement:
         *                 type: string
         *                 description: Additional details about the company's address.
         *               neighborhood:
         *                 type: string
         *                 description: The neighborhood where the company is located.
         *     responses:
         *       201:
         *         description: Company created successfully
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Company'
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
            next({ message: 'Pagina não encontrada', status: 404 })
        });

    }

}

/**
 * An instance of the UserRouter's express.Router.
 * @type {express.Router}
 */
module.exports = new Company().router;
