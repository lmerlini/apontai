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
        this.router.get(`/list`, this.controller.list);
        this.router.post(`/create`, this.controller.create);
        this.router.delete(`/delete`, this.controller.delete);
        this.router.patch(`/update/:id`, this.controller.update)
        
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
