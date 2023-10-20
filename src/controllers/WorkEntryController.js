const WorkEntryService = require("../service/WorkEntryService");


class WorkEntryController {

    constructor() {
        this.service = new WorkEntryService();
    }

    async list(req, res) {
        try {
            const { id } = req.user;
            const entries = await this.service.list(id);
            res.json(entries);
        } catch (error) {

            res.status(500).json({ message: 'Erro ao buscar apontamentos.', error: error });
        }
    }

    async listTotal(req, res) {
        const { startDate, endDate } = req.body
        const { id } = req.user;
        const totalWork = await this.service.getTotal(id, startDate, endDate)
        res.json(totalWork)
    }

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

    async destroy(req, res) {
        try {
            const message = await this.service.destroy(req.body.id);
            res.status(200).json({ message });
        } catch (error) {
            console.error('Erro ao deletar a entrada de trabalho:', error);
            res.status(500).json({ message: 'Erro ao deletar a entrada de trabalho.' });
        }
    }

    async update(req, res) {
        try {
            const updatedEntry = await this.service.update(req.body.id, req.body);
            res.json(updatedEntry);
        } catch (error) {
            res.status(500).json({ message: "Error updating work entry." });
        }
    }

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

module.exports = WorkEntryController;
