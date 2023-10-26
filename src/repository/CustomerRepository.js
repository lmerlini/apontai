const { Customer } = require('../models')

class CustomerRepository {
    constructor() {
        this.model = Customer
    }

    async find() {
        return await this.model.findAll();
    }

    async create(data) {
        return await this.model.create(data);
    }

    async findById(id) {
        return await this.model.findByPk(id);
    }

    async delete(id) {
        return await this.model.destroy({
            where: { id }
        });
    }

    async update(id, clientData) {
        const client = await this.findById(id);
        if (!client) {
            throw new Error('Cliente não encontrado.');
        }

        await this.model.update(clientData, {
            where: { id }
        });

        return await this.findById(id);
    }

}

module.exports = CustomerRepository;
