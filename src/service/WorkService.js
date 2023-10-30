const WorkRepository = require('../repository/WorkRepository');
const CustomerService = require('./CustomerService');
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
        this.work = new WorkRepository();
        this.customer = new CustomerService()
    }

    /**
     * Creates a new work entry associated with a specific customer.
     * @async
     * @param {number} customer_id - ID of the customer associated with the work entry.
     * @param {Object} data - Data for the work entry.
     * @returns {Promise<Object>} The created work entry.
     * @throws {Error} Throws an error if the specified customer does not exist.
     */
    async create(project_id, body) {
        const customer = await this.customer.findById(project_id)

        if (!customer) {
            throw new Error(`Projeto com ID ${project_id} não existe.`);
        }
        return this.work.create(body);
    }

    /**
     * Lists work entries associated with a specific user.
     * @async
     * @param {number} userId - ID of the user.
     * @returns {Promise<Array>} Array of work entries.
     */
    async list(userId) {
        return this.work.list(userId);
    }

    /**
     * Retrieves the total work entries for a given period associated with a specific user.
     * @async
     * @param {number} userId - ID of the user.
     * @param {string} startDate - Start date for the work entries retrieval.
     * @param {string} endDate - End date for the work entries retrieval.
     * @returns {Promise<Array>} Array of work entries.
     */
    async listPerDate(userId, startDate, endDate) {
        let result = await this.work.list(userId, {
            service_date: {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            }
        });
        return result;
    }

    /**
     * Deletes a work entry by its ID.
     * @async
     * @param {number} id - ID of the work entry.
     * @returns {Promise<string>} Success message.
     * @throws {Error} Throws an error if the work entry does not exist.
     */
    async delete(id) {
        const result = await this.work.delete(id);
        if (result) {
            return 'Entrada de trabalho deletada com sucesso!';
        } else {
            throw new Error(`Erro ao deletar entrada de trabalho com ID ${id} não existe.`);
        }
    }

    /**
     * Updates a work entry by its ID.
     * @param {number} id - ID of the work entry.
     * @param {Object} entryData - Updated data for the work entry.
     * @returns {Object} Updated work entry.
     * @throws {Error} Throws an error if the work entry cannot be updated.
     */
    update(id, project_id, body) {
        return this.work.updateById(id, project_id, body);
    }

    /**
     * Retrieves all work entries associated with a specific Projects.
     * @async
     * @param {number} id - ID of the Project.
     * @returns {Promise<Array>} Array of work entries associated with the Projects.
     */
    async getProjectsById(project_id, user_id) {
        return await this.work.findProjectId(project_id, user_id);
    }

}

/**
 * Exports the WorkService class.
 * @module WorkService
 */
module.exports = WorkService;
