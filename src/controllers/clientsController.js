const ClientService = require('../service/ClientService');

class ClientController {
    static async getAllClients(req, res) {
        const clients = await ClientService.getAllClients();
        res.json(clients);
    }
    
    static async createClient(req, res) {
        const clientData = req.body;
        const client = await ClientService.createClient(clientData);
        res.json(client);
    }

    static async deleteClient(req, res) {
        const { id } = req.body;
        try {
            const message = await ClientService.deleteClient(id);
            res.status(200).json({ message });
        } catch (error) {
            console.error('Erro ao deletar o Cliente:', error);
            res.status(500).json({ message: 'Erro ao deletar o Cliente.' });
        }
    }
}

module.exports = ClientController;
