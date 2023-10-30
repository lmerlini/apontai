const CostRepository = require('../repository/CostRepository.js');
const WorkRepository = require('../repository/WorkRepository.js');
const { Op } = require('sequelize');

/**
 * Service for handling work-related operations.
 */
class WorkService {

    /**
     * Constructs the WorkService.
     * @constructor
     */
    constructor() {
        this.cost = new CostRepository();
        this.work = new WorkRepository();
    }

    async create(work_id, body) {
        const cost = await this.work.findWorkId(work_id)

        if (!Array.isArray(cost) || cost.length === 0) {
            throw new Error(`Trabalho com ID ${work_id} não existe.`);
        }

        return this.cost.create(body);
    }

    async list() {
        return this.cost.list();
    }

    async delete(id) {
        const result = await this.cost.delete(id);
        if (result) {
            return 'Deletada com sucesso!';
        } else {
            throw new Error(`Erro ao deletar, ID ${id} não existe.`);
        }
    }

    update(work_id, body) {
        return this.cost.updateById(work_id, body);
    }

}

/**
 * Exports the WorkService class.
 * @module WorkService
 */
module.exports = WorkService;
