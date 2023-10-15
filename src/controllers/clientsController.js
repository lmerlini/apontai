const ClientService = require('../service/ClientService');

// TODO: criar intercptor para erros
class ClientController {
    static async getAllClients(req, res) {
        const clients = await ClientService.getAllClients();
        res.status(200).json(clients);
    }

    static async createClient(req, res) {
        const clientData = req.body;

        try {
            const client = await ClientService.createClient(clientData);
            res.status(201).json(client);
        } catch (error) {
            if (error.errors)
                res.status(500).json({ error: error.errors })
            else
                res.status(500).json({ error: "Ocorreu um erro, tente novamente!!!" })
        }
    }

    static async updateClient(req, res) {
        const { id } = req.params;
        const client = await ClientService.updateClient(id, req.body)
        res.status(200).json({ client: client })
    }

    static async deleteClient(req, res) {
        const { id } = req.params;
        try {
            const message = await ClientService.deleteClient(id);
            res.status(200).json({ message });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar o Cliente.' });
        }
    }
}

module.exports = ClientController;
