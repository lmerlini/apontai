const CustomerRepository = require('../repository/CustomerRepository');

/**
 * Service class for handling customer-related operations.
 */
class CustomerService {

    /**
     * Creates a new instance of the CustomerService.
     * @constructor
     */
    constructor() {
        this.repositoy = new CustomerRepository();
    }

    /**
     * Lists all customers.
     * @async
     * @returns {Promise<Object[]>} - Returns a list of customers.
     */
    async list() {
        return this.repositoy.find();
    }

    /**
     * Finds a customer by its ID.
     * @async
     * @param {string|number} client_id - The ID of the client to find.
     * @returns {Promise<Object|null>} - Returns the found customer or null.
     */
    async findById(client_id) {
        return this.repositoy.findById(client_id);
    }

    /**
     * Creates a new customer.
     * @async
     * @param {Object} clientData - The data of the customer to create.
     * @returns {Promise<Object>} - Returns the created customer.
     */
    async create(clientData) {
        // TODO: modify here to allow blank information
        if (clientData?.phone) {
            clientData.phone = clientData.phone.replace(/\D+/g, '');
        }

        if (clientData?.cnpj) {
            clientData.cnpj = clientData.cnpj.replace(/\D+/g, '');
        }

        return this.repositoy.create(clientData);
    }

    /**
     * Updates an existing customer by its ID.
     * @async
     * @param {string|number} id - The ID of the customer to update.
     * @param {Object} clientData - The data to update the customer with.
     * @returns {Promise<Object>} - Returns the updated customer.
     * @throws {Error} - Throws an error if the customer update failed.
     */
    async update(id, clientData) {
        if (clientData?.phone) {
            clientData.phone = clientData.phone.replace(/\D+/g, '');
        }

        if (clientData?.cnpj) {
            clientData.cnpj = clientData.cnpj.replace(/\D+/g, '');
        }

        const updatedClient = await this.repositoy.update(id, clientData);

        if (!updatedClient) {
            throw new Error('Erro ao atualizar cliente.');
        }

        return updatedClient;
    }

    /**
     * Deletes a customer by its ID.
     * @async
     * @param {string|number} id - The ID of the customer to delete.
     * @returns {Promise<string>} - Returns a message indicating the success of the deletion.
     * @throws {Error} - Throws an error if the customer deletion failed.
     */
    async delete(id) {
        const result = await this.repositoy.delete(id);
        if (result) {
            return 'Cliente deletado com sucesso!';
        } else {
            throw new Error('Erro ao deletar cliente.');
        }
    }

    /**
     * Deletes multiple customers provided an array of IDs.
     * @async
     * @param {string[]|number[]} ids - The array of IDs of the customers to delete.
     * @returns {Promise<string>} - Returns a message indicating the success of the deletion.
     * @throws {Error} - Throws an error if the customers deletion failed.
     */
    async deleteClients(ids) {
        const result = await this.repositoy.delete(ids);
        if (result) {
            return 'Clientes deletados com sucesso!';
        } else {
            throw new Error('Erro ao deletar clientes.');
        }
    }
}

/**
 * Exports the CustomerService class.
 * @module CustomerService
 */
module.exports = CustomerService;
