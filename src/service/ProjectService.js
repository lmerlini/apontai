const ProjectRepository = require('../repository/ProjectRepository.js');

class ProjectService {

    constructor() {
        this.repository = new ProjectRepository()
    }

    async list() {
        return await this.repository.list()
    }

    async findById(project_id) {
        return await this.repository.findById(project_id);
    }


    async create(body) {
        return await this.repository.create(body)
    }

    async update(project_id, accountable_id, data) {
        return await this.repository.update(project_id, accountable_id, data)
    }

    async delete(id_project) {
        return await this.repository.delete(id_project)
    }

}

module.exports = ProjectService;
