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
}

module.exports = AuthRepository;
