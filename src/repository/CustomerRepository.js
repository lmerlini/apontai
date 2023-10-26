const { Customer } = require('../models');

/**
 * Repository class for customer-related database operations.
 */
class CustomerRepository {
    
    /**
     * Constructor for the CustomerRepository class.
     */
    constructor() {
        this.model = Customer
    }

    /**
     * Fetches all customer records from the database.
     * @returns {Promise<Array>} An array of Customer instances.
     */
    async find() {
        return await this.model.findAll();
    }

    /**
     * Creates a new customer record in the database.
     * @param {Object} data - The data for the new customer.
     * @returns {Promise<Object>} The created Customer instance.
     */
    async create(data) {
        return await this.model.create(data);
    }

    /**
     * Fetches a specific customer by their ID.
     * @param {number} id - The ID of the customer to fetch.
     * @returns {Promise<Object>} The Customer instance.
     */
    async findById(id) {
        return await this.model.findByPk(id);
    }

    /**
     * Deletes a specific customer by their ID.
     * @param {number} id - The ID of the customer to delete.
     * @returns {Promise<number>} The number of records deleted.
     */
    async delete(id) {
        return await this.model.destroy({
            where: { id }
        });
    }

    /**
     * Updates the data of a specific customer.
     * @param {number} id - The ID of the customer to update.
     * @param {Object} clientData - The new data for the customer.
     * @returns {Promise<Object>} The updated Customer instance.
     * @throws {Error} Throws an error if the customer is not found.
     */
    async update(id, clientData) {
        const client = await this.findById(id);
        if (!client) {
            throw new Error('Cliente não encontrado.');
        }

        await this.model.update(clientData, {
            where: { id }
        });

        return await this.findById(id);
    }

}

/**
 * Exports the CustomerRepository class.
 * @module CustomerRepository
 */
module.exports = CustomerRepository;
