const { Client } = require('../models');

class ClientRepository {
    static async findAll() {
        return Client.findAll();
    }

    static async create(data) {
        return Client.create(data);
    }

    static async findById(id) {
        return await Client.findByPk(id);
    }

    static async deleteById(id) {
        return Client.destroy({
            where: { id }
        });
    }

    static async updateById(id, clientData) {
        try {
            const client = await this.findById(id); 
            if (!client) {
                throw new Error('Cliente não encontrado.');
            }
            await client.update(clientData);
            return true; 
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            return false; // Retorna falso se houver algum erro
        }
    }

}

module.exports = ClientRepository;
