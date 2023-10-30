const CompanyService = require('../service/CompanyService.js');

class CompanyController {
    constructor() {
        this.service = new CompanyService();
    }

    list = async (req, res) => {
        try {
            const companies = await this.service.list();
            res.status(200).json(companies);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    create = async (req, res) => {
        try {
            const company = await this.service.create(req.body);
            res.status(201).json(company);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    delete = async (req, res) => {
        try {
            await this.service.delete(req.body.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    update = async (req, res) => {
        try {
            const company = await this.service.update(req.params.id, req.body);
            res.status(200).json(company);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = CompanyController;
