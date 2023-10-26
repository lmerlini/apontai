const CustomerRepository = require('../repository/CustomerRepository');

class CustomerService {

    constructor(){
        this.repositoy = new CustomerRepository()
    }

    async list() {
        return this.repositoy.find();
    }

    async findById(client_id) {
        return this.repositoy.findById(client_id)
    }


    async create(clientData) {
        //TODO. modificar aqui para permitir informações em branco
        if (clientData?.phone) {
            clientData.phone = clientData.phone.replace(/\D+/g, '');
        }

        if (clientData?.cnpj) {
            clientData.cnpj = clientData.cnpj.replace(/\D+/g, '');
        }

        return this.repositoy.create(clientData);
    }

    async update(id, clientData) {
        if (clientData?.phone) {
            clientData.phone = clientData.phone.replace(/\D+/g, '');
        }

        if (clientData?.cnpj) {
            clientData.cnpj = clientData.cnpj.replace(/\D+/g, '');
        }

        const updatedClient = await this.repositoy.update(id, clientData);

        if (!updatedClient) {
            throw new Error('Erro ao atualizar cliente.');
        }

        return updatedClient;
    }

    async delete(id) {
        const result = await this.repositoy.delete(id);
        if (result) {
            return 'Cliente deletado com sucesso!';
        } else {
            throw new Error('Erro ao deletar cliente.');
        }
    }
    async deleteClients(ids) {

        const result = await this.repositoy.delete(ids);
        if (result) {
            return 'Clientes deletados com sucesso!';
        } else {
            throw new Error('Erro ao deletar clientes.');
        }
    }
}

module.exports = CustomerService;
