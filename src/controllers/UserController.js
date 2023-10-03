const UserService = require('../service/UserService');

class UserController {
  
  static async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      next(new Error('Erro ao buscar usuários.'));
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.body;
      const result = await UserService.deleteUserById(id);
      
      if (result.success) {
        return res.status(200).json({ message: result.message });
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (error) {
      console.error('Erro ao deletar o usuário:', error);
      return res.status(500).json({ message: 'Erro ao deletar o usuário.' });
    }
  }
}

module.exports = UserController;
