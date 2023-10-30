const CompanyRepository = require('../repository/CompanyRepository.js');

class CompanyService {
    constructor() {
        this.repository = new CompanyRepository();
    }

    async list() {
        return this.repository.findAll();
    }

    async create(data) {
        return this.repository.create(data);
    }

    async delete(id) {
        return this.repository.delete(id);
    }

    async update(id, data) {
        return this.repository.update(id, data);
    }
}

module.exports = CompanyService;