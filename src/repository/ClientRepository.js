const { Client } = require('../models');

class ClientRepository {
    async findAll() {
        return await Client.findAll();
    }

    async create(data) {
        return await Client.create(data);
    }

    async deleteById(id) {
        return await Client.destroy({
            where: { id }
        });
    }
}

module.exports = new ClientRepository();
