const CompanyService = require('../service/CompanyService.js');

class CompanyController {
    constructor() {
        this.service = new CompanyService();
    }

    list = async (req, res, next) => {
        try {
            const companies = await this.service.list();
            res.status(200).json(companies);
        } catch (error) {
            next(error)
        }
    }

    create = async (req, res, next) => {
        try {
            const company = await this.service.create(req.body);
            res.status(201).json(company);
        } catch (error) {
            next(error)
        }
    }

    delete = async (req, res, next) => {
        try {
            await this.service.delete(req.body.id);
            res.status(204).send();
        } catch (error) {
            next(error)
        }
    }

    update = async (req, res, next) => {
        try {
            const company = await this.service.update(req.params.id, req.body);
            res.status(200).json(company);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CompanyController;
