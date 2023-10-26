const WorkService = require("../service/WorkService");

/**
 * Controller for handling work-related operations.
 */
class WorkController {

    /**
     * Constructs the WorkController.
     * @constructor
     */
    constructor() {
        this.service = new WorkService();
    }

    /**
     * Lists work entries associated with the logged-in user.
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    async list(req, res) {
        try {
            const { id } = req.user;
            const entries = await this.service.list(id);
            res.json(entries);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar apontamentos.', error: error });
        }
    }

    /**
     * Lists total work for a given period associated with the logged-in user.
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    async listTotal(req, res) {
        const { startDate, endDate } = req.body;
        const { id } = req.user;
        const totalWork = await this.service.getTotal(id, startDate, endDate);
        res.json(totalWork);
    }

    /**
     * Creates a new work entry.
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    async create(req, res) {
        try {
            const { client_id } = req.body;
            const { id } = req.user;
            req.body.user_id = id;

            const entry = await this.service.create(client_id, req.body);
            res.json(entry);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Deletes a work entry by its ID.
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    async destroy(req, res) {
        try {
            const message = await this.service.destroy(req.body.id);
            res.status(200).json({ message });
        } catch (error) {
            console.error('Erro ao deletar a entrada de trabalho:', error);
            res.status(500).json({ message: 'Erro ao deletar a entrada de trabalho.' });
        }
    }

    /**
     * Updates an existing work entry by its ID.
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    async update(req, res) {
        try {
            const updatedEntry = await this.service.update(req.body.id, req.body);
            res.json(updatedEntry);
        } catch (error) {
            res.status(500).json({ message: "Error updating work entry." });
        }
    }

    /**
     * Retrieves a work entry by its associated client ID.
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    async getClientById(req, res) {
        try {
            const entry = await this.service.getClientById(req.params.client_id);
            if (entry) {
                res.json(entry);
            } else {
                res.status(404).json({ message: "Work entry not found." });
            }
        } catch (error) {
            res.status(500).json({ message: "Error retrieving work entry." });
        }
    }

}

/**
 * Exports the WorkController class.
 * @module WorkController
 */
module.exports = WorkController;
