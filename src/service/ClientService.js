const ClientRepository = require('../repository/ClientRepository');

class ClientService {

    static async getAllClients() {
        return ClientRepository.findAll();
    }


    static async createClient(clientData) {
        //TODO. modificar aqui para permitir informações em branco
        if (clientData?.phone) {
            clientData.phone = clientData.phone.replace(/\D+/g, '');
        }

        if (clientData?.cnpj) {
            clientData.cnpj = clientData.cnpj.replace(/\D+/g, '');
        }

        return ClientRepository.create(clientData);
    }

    static async updateClient(id, clientData) {
        if (clientData?.phone) {
            clientData.phone = clientData.phone.replace(/\D+/g, '');
        }

        if (clientData?.cnpj) {
            clientData.cnpj = clientData.cnpj.replace(/\D+/g, '');
        }

        const updatedClient = await ClientRepository.updateById(id, clientData);

        if (!updatedClient) {
            throw new Error('Erro ao atualizar cliente.');
        }

        return updatedClient;
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
