const AuthService = require('../service/AuthService');
const jwt = require('jsonwebtoken');

class AuthController {


  constructor() {
    this.service = new AuthService()
  }

  async login(req, res) {
    try {
      const { token, refreshToken } = await this.service.login(req, res);

      if (token && refreshToken) {
        return res.status(200).json({ message: 'Logado com Sucesso', token, refreshToken });
      } else {
        return res.status(401).send({ message: 'Não autorizado' });
      }
    } catch (error) {      
      res.status(500).json({ mesage: "Erro ao desconectar", error: error });
    }
  }

  async register(req, res, next) {
    try {
      const user = await this.service.register(req.body);
      return res.json(user);
    } catch (error) {
      res.status(500).json({ mesage: "Erro ao desconectar", error: error });
    }
  }

  async logout(req, res) {
    try {
      await this.service.logout(req);
      res.status(200).json({ message: "Desconectado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao desconectar" });
    }
  }

  async getCurrentUser(req, res, next) {
    try {
      const user = await this.service.getCurrentUser(req.headers['authorization']);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async verifyToken(req, res) {
    try {
      const token = this.service.hasToken(req.headers['authorization']);
      this.service.verifyToken(token);
      return res.status(200).json({ message: 'Token válido.' });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refresh_token } = req.body;
      if (!refresh_token) {
        return res.status(400).json({ message: "Refresh token não fornecido" });
      }

      const newToken = await this.service.refreshAccessToken(refresh_token);
      return res.status(200).json({ token: newToken });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
