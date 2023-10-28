const { User } = require('../models');

/**
 * Repository class for authentication-related database operations.
 */
class AuthRepository {

  constructor() {
    this.model = User
  }

  /**
   * Update last login 
   * @param {BigInteger} user_id 
   */
  async updateLastLogin(user_id) {
    const currentDate = new Date();
    await this.model.update({ last_login: currentDate }, { where: { id: user_id } });
  }

  /**
   * Creates a new user record in the database.
   * @param {Object} param0 - Object containing user details.
   * @param {string} param0.username - The desired username for the new user.
   * @param {string} param0.password - The password for the new user.
   * @returns {Promise<Object>} The created User instance.
   * @throws {Error} Throws an error if the username is already in use or if there's any other issue.
   */
  async createUser(data) {
    try {
      const user = await this.model.create(data);
      return user;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Nome de usuário já está em uso!');
      }
      throw error;
    }
  }

  /**
   * Fetches a specific user by their ID.
   * @param {number} id - The ID of the user to fetch.
   * @returns {Promise<Object>} The User instance.
   * @throws {Error} Throws an error if the user is not found or if there's any other issue.
   */
  async findById(id) {
    try {
      const user = await this.model.findByPk(id);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Exports the AuthRepository class.
 * @module AuthRepository
 */
module.exports = AuthRepository;
