const { Costs } = require('../models');
const FieldsRepository = require('./FieldsRepository')


/**
 * Repository for handling operations related to the Work model.
 */
class WorkRepository {

    /**
     * Constructs the WorkRepository.
     * @constructor
     */
    constructor() {
        this.model = Costs
        this.fields = new FieldsRepository()
    }

    async list() {
        const results = await this.model.findAll({
            ... this.fields.getAttributes()
        });

        return results
    }


    async create(data) {
        return await this.model.create(data);
    }


    async delete(id) {
        return await this.model.destroy({
            where: { id }
        });
    }

    async updateById(work_id, data) {

        const result = await this.model.findOne({
            where: { id: work_id, },
            ... this.fields.getAttributes()
        });

        return result.update(data);
    }

}

/**
 * Exports the WorkRepository class.
 */
module.exports = WorkRepository;
