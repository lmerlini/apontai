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
}

module.exports = ClientRepository;
