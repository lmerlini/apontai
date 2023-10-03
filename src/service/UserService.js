const UserRepository = require('../repository/UserRepository');

class UserService {
  
  static async getAllUsers() {
    return await UserRepository.findAll();
  }

  static async deleteUserById(id) {
    const result = await UserRepository.delete(id);
    if (result) {
      return { success: true, message: 'Usuário deletado com sucesso!' };
    } else {
      return { success: false, message: 'Não foi possível deletar o usuário.' };
    }
  }

}

module.exports = UserService;
