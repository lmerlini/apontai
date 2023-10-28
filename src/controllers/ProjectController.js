const ProjectService = require('../service/ProjectService.js');


class ProjectController {

    constructor() {
        this.service = new ProjectService()
    }


    list = async (_, res) => {
        try {
            const result = await this.service.list();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao listar projetos!" })
        }
    }

    create = async (req, res) => {
        try {
            const result = await this.service.create(req.body)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar projeto!", error: error })

        }
    }

    update = async (req, res) => {
        try {

            const { project_id } = req.params
            const { accountable_id } = req.body
            const result = await this.service.update(project_id, accountable_id, req.body)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar projeto!", error: error })
        }
    }

    delete = async (req, res) => {
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
