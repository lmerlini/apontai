const { Project, Work } = require('../models');


class ProjectRepository {
    constructor() {
        this.model = Project
        this.work = Work
    }

    async list() {
        return await this.model.findAll() 
    }

    async findById(project_id) {

        return await this.work.findByPk(
            {
                where: { project_id: project_id }
            }
        );
    }

    async create(body) {
        return await this.model.create(body)
    }

    async update(project_id, accountable_id, data) {

        const result = await this.model.findOne({
            where: { id: project_id, accountable_id: accountable_id }
        });

        if (!result)
            throw new Error("Projeto não encontrado!")        

        return await this.model.update(data, {
            where: { id: project_id, accountable_id: accountable_id }
        })
    }

    async delete(id_project) {
        return await this.model.destroy({
            where: { id: id_project }
        })
    }
}

/**
 * Exports the ProjectRepository class.
 */
module.exports = ProjectRepository;
