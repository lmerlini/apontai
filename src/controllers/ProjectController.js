const ProjectService = require('../service/ProjectService.js');


class ProjectController {

    constructor() {
        this.service = new ProjectService()
    }


    list = async (_, res, next) => {
        try {
            const result = await this.service.list();
            return res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }

    create = async (req, res, next) => {
        try {
            const result = await this.service.create(req.body)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    update = async (req, res, next) => {
        try {
            const { project_id } = req.params
            const { accountable_id } = req.body
            const result = await this.service.update(project_id, accountable_id, req.body)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    delete = async (req, res, next) => {
        try {
            const result = await this.service.delete(req.body.id)
            if (!result) {
                return res.status(500).json({ message: `Erro ao deletar Projeto com id ${req.body.id}` })
            }
            return res.status(201).json({ message: "Projeto Deletado com sucesso!" })
        } catch (error) {
            next(error)
        }
    }

}

/**
 * Exporting an instance of ProjectController for Project-related operations.
 * @type {ProjectController}
 */
module.exports = ProjectController;
