const UserRepository = require('../repository/UserRepository');

class UserService {

  constructor() {
    this.repository = new UserRepository()
  }

  async list() {
    return await this.repository.list();
  }

  /**
   * Register a new user. 
  * @param {Object} userData - The data of the user to be registered.
  * @returns {Promise<Object>} The created user object.
  */
  async create(userData) {
    return this.repository.create(userData);
  }

  async delete(id) {
    const result = await this.repository.delete(id);
    if (result) {
      return { success: true, message: 'Usuário deletado com sucesso!' };
    } else {
      return { success: false, message: 'Não foi possível deletar o usuário.' };
    }
  }

}

module.exports = UserService;
