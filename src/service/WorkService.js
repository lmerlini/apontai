const WorkRepository = require('../repository/WorkRepository');
const { Op } = require('sequelize');
const CustomerService = require('./CustomerService');

/**
 * Service for handling work-related operations.
 */
class WorkService {

    /**
     * Constructs the WorkService.
     * @constructor
     */
    constructor() {
        this.workRepo = new WorkRepository();
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
    async create(customer_id, data) {
        const customer = await this.customer.findById(customer_id)

        if (!customer) {
            throw new Error(`Cliente com ID ${customer_id} não existe.`);
        }
        return this.workRepo.create(data);
    }

    /**
     * Lists work entries associated with a specific user.
     * @async
     * @param {number} userId - ID of the user.
     * @returns {Promise<Array>} Array of work entries.
     */
    async list(userId) {
        return this.workRepo.findByUserId(userId);
    }

    /**
     * Retrieves the total work entries for a given period associated with a specific user.
     * @async
     * @param {number} userId - ID of the user.
     * @param {string} startDate - Start date for the work entries retrieval.
     * @param {string} endDate - End date for the work entries retrieval.
     * @returns {Promise<Array>} Array of work entries.
     */
    async getTotal(userId, startDate, endDate) {
        let result = await this.workRepo.find({
            where: {
                user_id: userId,
                service_date:
                {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
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
    async destroy(id) {
        const result = await this.workRepo.deleteById(id);
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
    update(id, entryData) {
        const result = this.workRepo.updateById(id, entryData);
        if (result) {
            return result;
        } else {
            throw new Error(`Não foi possível alterar, tente novamente!`);
        }
    }

    /**
     * Retrieves all work entries associated with a specific client.
     * @async
     * @param {number} id - ID of the client.
     * @returns {Promise<Array>} Array of work entries associated with the client.
     */
    async getClientById(id) {
        return await this.workRepo.findAll({
            where: { client_id: id }
        });
    }

}

/**
 * Exports the WorkService class.
 * @module WorkService
 */
module.exports = WorkService;
