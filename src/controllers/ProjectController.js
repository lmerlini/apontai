const ProjectService = require('../service/ProjectService.js');


class ProjectController {

    constructor() {
        this.service = new ProjectService()
    }

    async list(_, res) {
        try {
            const result = await this.service.list()
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao listar projetos!", error: error })
        }
    }

    async create(req, res) {
        try {
            const result = await this.service.create(req.body)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar projeto!", error: error })
        }
    }

    async update(req, res) {
        try {

            const { project_id, accountable_id } = req.params
            const result = await this.service.update(project_id, accountable_id, req.body)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar projeto!", error: error })
        }
    }

    async delete(req, res) {
        try {
            const result = await this.service.delete(req.body.id)
            if (!result) {
                return res.status(500).json({ message: `Erro ao deletar Projeto com id ${req.body.id}` })
            }
            return res.status(201).json({ message: "Projeto Deletado com sucesso!" })
        } catch (error) {
            return res.status(500).json({ message: "Erro ao deletar projeto!", error: error })
        }
    }

}

/**
 * Exporting an instance of ProjectController for Project-related operations.
 * @type {ProjectController}
 */
module.exports = ProjectController;
