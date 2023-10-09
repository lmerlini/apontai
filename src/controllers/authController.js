const AuthService = require('../service/AuthService');
const jwt = require('jsonwebtoken');

class AuthController {

  static async login(req, res, next) {
    try {
      // TODO...: Implementar o remember-me com duração maior quando o usuário selecionar
      const token = await AuthService.login(req, res);
      if (token) {
        return res.json({ message: 'Logado com Sucesso', token });
      } else {
        return res.status(401).send({ message: 'Não autorizado' });
      }
    } catch (error) {
      return error //next(error); estava dando problema no login várias requests
    }
  }

  static async register(req, res, next) {
    try {
      const user = await AuthService.register(req.body);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static logout(req, res) {
    AuthService.logout(req);
    res.status(200).json({ message: "Desconectado com sucesso" });
  }

  static async getCurrentUser(req, res, next) {
    try {
      const user = await AuthService.getCurrentUser(req.headers['authorization']);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async verifyToken(req, res) {
    try {
      const token = AuthService.hasToken(req.headers['authorization']);
      AuthService.verifyToken(token);
      return res.status(200).json({ message: 'Token válido.' });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }
}

module.exports = AuthController;
