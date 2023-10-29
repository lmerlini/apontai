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


  async delete(user_id) {
    try {

      const user = await this.model.destroy({ where: { id: user_id } })
      return user
    } catch (error) {
      return error
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
