const WorkEntryService = require('../service/WorkEntryService');

class WorkEntryController {

    static async list(req, res) {
        try {
            const entries = await WorkEntryService.getAll();
            res.json(entries);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving work entries." });
        }
    }

    static async create(req, res) {
        try {
            const { client_id } = req.body
            const entry = await WorkEntryService.create(client_id, req.body);
            res.json(entry);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async destroy(req, res) {
        try {
            const message = await WorkEntryService.delete(req.body.id);
            res.status(200).json({ message });
        } catch (error) {
            console.error('Erro ao deletar a entrada de trabalho:', error);
            res.status(500).json({ message: 'Erro ao deletar a entrada de trabalho.' });
        }
    }

    static async update(req, res) {
        try {
            const updatedEntry = await WorkEntryService.update(req.body.id, req.body);
            res.json(updatedEntry);
        } catch (error) {
            res.status(500).json({ message: "Error updating work entry." });
        }
    }

    static async getClientById(req, res) {
        try {
            const entry = await WorkEntryService.getClientById(req.params.client_id); 
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
