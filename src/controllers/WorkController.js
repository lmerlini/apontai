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
    list = async (req, res) => {
        try {
            this._preprocessRequest(req);
            const entries = await this.service.list(req.body.user_id);
            return res.status(200).json(entries);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar apontamentos.', error: error });
        }
    }

    /**
     * Lists total work for a given period associated with the logged-in user.
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    listPerDate = async (req, res) => {
        this._preprocessRequest(req);
        const { startDate, endDate } = req.body;
        const totalWork = await this.service.listPerDate(req.body.user_id, startDate, endDate);
        return res.status(200).json(totalWork);
    }

    /**
     * Creates a new work entry.
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    create = async (req, res) => {
        try {
            this._preprocessRequest(req);
            const { project_id } = req.body;

            if (!this._validateId(project_id)) {
                return res.status(400).json({ message: 'ID do Projecto inválido.' });
            }
            const entry = await this.service.create(project_id, req.body);
            return res.status(200).json(entry);
        } catch (error) {
            return res.status(400).json({ message: "Não foi possível criar o trabalho, verifique!", error: error });
        }
    }

    /**
     * Deletes a work entry by its ID.
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    destroy = async (req, res) => {
        try {
            this._preprocessRequest(req);
            const message = await this.service.destroy(req.body.id);
            return res.status(200).json({ message });
        } catch (error) {
            console.error('Erro ao deletar a entrada de trabalho:', error);
            return res.status(500).json({ message: 'Erro ao deletar a entrada de trabalho.' });
        }
    }

    /**
     * Updates an existing work entry by its ID.
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    update = async (req, res) => {
        try {
            this._preprocessRequest(req);
            const { work_id, project_id } = req.params;

            if (!this._validateId(work_id) || !this._validateId(project_id)) {
                return res.status(400).json({ message: 'Projeto inválido.' });
            }

            const updatedEntry = await this.service.update(work_id, project_id, req.body);
            res.status(200).json(updatedEntry);
        } catch (error) {
            res.status(500).json({ message: "Erro ao alterar o apontamento.", error: error });
        }
    }

    /**
     * Retrieves a work entry by its associated client ID.
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    getProjectsById = async (req, res) => {
        try {
            this._preprocessRequest(req);
            const { project_id } = req.params;

            if (!this._validateId(project_id)) {
                return res.status(400).json({ message: 'Projeto inválido.' });
            }

            const entry = await this.service.getProjectsById(project_id, req.body.user_id);

            if (entry) {
                return res.status(200).json(entry);
            } else {
                return res.status(404).json({ message: "Projeto não encontrado." });
            }

        } catch (error) {
            return res.status(500).json({ message: "Erro ao retornar Projetos.", error: error });
        }
    }

    /**
     * Preprocess the request and adds the user ID to the request body.
     * @private
     * @param {Object} req - The Express request object.
     */
    _preprocessRequest(req) {
        const { id } = req.user;
        req.body.user_id = id;
    }

    /**
     * Validates the provided ID.
     * @param {number|string} id - The ID to validate.
     * @returns {boolean} True if the ID is valid, otherwise false.
     */
    _validateId(id) {
        const parsedId = parseInt(id, 10);
        return !isNaN(parsedId) && parsedId > 0;
    }
}

/**
 * Exports the WorkController class.
 * @module WorkController
 */
module.exports = WorkController;
