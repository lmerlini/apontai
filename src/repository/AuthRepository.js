const { User } = require('../models');

class AuthRepository {

  static async createUser({ username, password }) {
    try {
      const user = await User.create({ username, password });
      return user;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Nome de usuário já está em uso!');
      }
      throw error;
    }
  }

  static async findById(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthRepository;
