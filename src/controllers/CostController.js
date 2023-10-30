const CostService = require("../service/CostService.js");

/**
 * Controller for handling work-related operations.
 */
class CostController {

    /**
     * Constructs the CostController.
     * @constructor
     */
    constructor() {
        this.service = new CostService();
    }


    list = async (req, res, next) => {
        try {
            this._preprocessRequest(req);
            const entries = await this.service.list();
            return res.status(200).json(entries);
        } catch (error) {
            next(error)
        }
    }

    create = async (req, res, next) => {
        try {
            this._preprocessRequest(req);
            const { work_id } = req.body;

            if (!this._validateId(work_id)) {
                return res.status(400).json({ message: 'ID do Apontamento inválido.' });
            }
            const entry = await this.service.create(work_id, req.body);
            return res.status(200).json(entry);
        } catch (error) {
            next(error)
        }
    }

    delete = async (req, res, next) => {
        try {
            this._preprocessRequest(req);
            const message = await this.service.delete(req.body.id);
            return res.status(200).json({ message });
        } catch (error) {
            next(error)
        }
    }

    update = async (req, res, next) => {
        try {
            this._preprocessRequest(req);
            const { work_id } = req.params;

            if (!this._validateId(work_id)) {
                return res.status(400).json({ message: 'Id inválido.' });
            }

            const updatedEntry = await this.service.update(work_id, req.body);
            res.status(200).json(updatedEntry);
        } catch (error) {
            next(error)
        }
    }

    _preprocessRequest(req) {
        const { id } = req.user;
        req.body.user_id = id;
    }

    _validateId(id) {
        const parsedId = parseInt(id, 10);
        return !isNaN(parsedId) && parsedId > 0;
    }
}

/**
 * Exports the CostController class.
 * @module CostController
 */
module.exports = CostController;
