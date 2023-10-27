const { Work } = require('../models');

/**
 * Repository for handling operations related to the Work model.
 */
class WorkRepository {

    /**
     * Constructs the WorkRepository.
     * @constructor
     */
    constructor() {
        this.model = Work
    }

    /**
     * Finds work entries based on given parameters.
     * @async
     * @param {Object} [params={}] - Parameters to filter the results.
     * @returns {Promise<Array>} Array of work entries.
     */
    async find(params = {}) {
        const results = await this.model.findAll(params);

        return results.map(entry => {
            const plainEntry = entry.get({ plain: true });
            plainEntry.daily_total = entry.daily_total;
            return plainEntry;
        });
    }

    /**
     * Finds work entries associated with a specific user.
     * @async
     * @param {number} userId - ID of the user.
     * @returns {Promise<Array>} Array of work entries with the daily total included.
     */
    async findByUserId(userId) {
        const results = await this.model.findAll({
            where: { user_id: userId }
        });

        return this.generateTotalDaily(results);
    }

    async findProjectId(project_id, user_id) {
        return this.model.findAll({
            where: {
                project_id: project_id,
                user_id: user_id  
            }
        })
    }

    /**
     * Creates a new work entry.
     * @async
     * @param {Object} data - Data for the new work entry.
     * @returns {Promise<Object>} The created work entry.
     */
    async create(data) {
        return await this.model.create(data);
    }

    /**
     * Deletes a work entry by its ID.
     * @async
     * @param {number} id - ID of the work entry.
     * @returns {Promise<number>} The number of destroyed rows.
     */
    async deleteById(id) {
        return await this.model.destroy({
            where: { id }
        });
    }

    /**
     * Updates a work entry by its ID.
     * @async
     * @param {number} id - ID of the work entry.
     * @param {Object} data - Updated data for the work entry.
     * @returns {Promise<Object>} Updated work entry.
     */
    async updateById(id, project_id, data) {

        const result = await this.model.findOne({
            where: { id: id, project_id: project_id }
        });

        return result.update(data);
    }

    /**
     * Generates daily totals for given work entries.
     * @async
     * @param {Array} data - Array of work entries.
     * @returns {Promise<Array>} Array of work entries with the daily total included.
     */
    async generateTotalDaily(data) {
        return await data.map(entry => {
            const plainEntry = entry.get({ plain: true });
            plainEntry.daily_total = entry.daily_total;
            return plainEntry;
        });
    }
}

/**
 * Exports the WorkRepository class.
 */
module.exports = WorkRepository;
