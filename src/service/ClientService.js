const ClientRepository = require('../repository/ClientRepository');

class ClientService {
    static async getAllClients() {
        return ClientRepository.findAll();
    }

    static async createClient(clientData) {
        clientData.phone = clientData.phone.replace(/\D+/g, '');
        clientData.cnpj = clientData.cnpj.replace(/\D+/g, '');
        return ClientRepository.create(clientData);
    }

    static async deleteClient(id) {
        const result = await ClientRepository.deleteById(id);
        if (result) {
            return 'Cliente deletado com sucesso!';
        } else {
            throw new Error('Erro ao deletar cliente.');
        }
    }
}

module.exports = ClientService;
