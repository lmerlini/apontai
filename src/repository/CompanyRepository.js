const { Company } = require('../models');
class CompanyRepository {
    constructor() {
        this.model = Company;
    }

    async findAll() {
        return this.model.findAll();
    }

    async create(data) {
        return this.model.create(data);
    }

    async delete(id) {
        return this.model.destroy({ where: { id } });
    }

    async update(id, data) {
        return this.model.update(data, { where: { id } });
    }
}

module.exports = CompanyRepository;
