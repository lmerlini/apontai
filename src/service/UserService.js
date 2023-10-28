const UserRepository = require('../repository/UserRepository');

class UserService {

  constructor() {
    this.repository = new UserRepository()
  }

  async list() {
    return await this.repository.list();
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
