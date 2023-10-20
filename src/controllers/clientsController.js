const ClientService = require('../service/ClientService');

class ClientController {

    constructor() {
        this.service = new ClientService();
    }

    async list(_, res) {
        try {

            const clients = await this.service.list();
            res.status(200).json(clients);
        } catch (error) {
            res.status(500).json({
                message: 'Erro ao retornar dados dos clientes',
                error: error
            })
        }
    }

    async create(req, res) {
        const clientData = req.body;

        try {
            const client = await this.service.create(clientData);
            res.status(201).json(client);
        } catch (error) {
            if (error.errors)
                res.status(500).json({ error: error.errors })
            else
                res.status(500).json({ error: "Ocorreu um erro, tente novamente!!!" })
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const client = await this.service.update(id, req.body)
        res.status(200).json({ client: client })
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const message = await this.service.delete(id);
            res.status(200).json({ message });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar o Cliente.' });
        }
    }

    async deleteClients(req, res) {
        try {
            const message = await this.service.delete(req.body.id);
            res.status(200).json({ message });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar o Cliente.', error });
        }
    }
}

module.exports = ClientController;
