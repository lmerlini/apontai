const { User } = require('../models');
const FieldsRepository = require('./FieldsRepository')

/**
 * Repository class for User-related database operations.
 */
class UserRepository {

    constructor() {
        this.model = User
        this.fields = new FieldsRepository().exclude([
            'password'
        ])
    }

    /**
     * Fetches all user records from the database.
     * @returns {Promise<Array>} An array of User instances.
     */
    async list() {
        return await this.model.findAll(this.fields.getAttributes());
    }

    /**
     * Fetches a specific user by their ID.
     * @param {number} id - The ID of the user to fetch.
     * @returns {Promise<Object|null>} The User instance or null if not found.
     */
    async findById(id) {
        return await this.model.findByPk(id, this.fields.getAttributes());
    }

    /**
     * Creates a new user record in the database.
     * @param {Object} data - The data of the user to be created.
     * @returns {Promise<Object>} The created User instance.
     */
    async create(data) {
        return await this.model.create(data);
    }

    /**
     * Deletes a user record by their ID.
     * @param {number} id - The ID of the user to delete.
     * @returns {Promise<number>} The number of rows affected (1 if deletion was successful, 0 otherwise).
     */
    async delete(id) {
        return await this.model.destroy({
            where: { id }
        });
    }
}

/**
 * Exports the UserRepository class.
 */
module.exports = UserRepository;
