const AuthService = require('../service/AuthService');
const jwt = require('jsonwebtoken');

/**
 * Controller for handling authentication and authorization requests.
 */
class AuthController {

  /**
   * Constructs the AuthController and initializes the authentication service.
   * @constructor 
   * @see AuthService
   */
  constructor() {
    this.service = new AuthService();
  }

  /**
   * Handles the login request.
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  login = async (req, res) => {
    try {
      const { token, refreshToken } = await this.service.login(req, res);

      if (token && refreshToken) {
        return res.status(200).json({ message: 'Logado com Sucesso', token, refreshToken });
      } else {
        return res.status(401).send({ message: 'Não autorizado' });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao efetuar login" });
    }
  }

  /**
   * Handles the logout request.
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  logout = async (req, res) => {
    try {
      await this.service.logout(req);
      return res.status(200).json({ message: "Desconectado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao desconectar" });
    }
  }

  /**
   * Retrieves the current authenticated user's information.
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  getCurrentUser = async (req, res) => {
    try {
      const user = await this.service.getCurrentUser(req.headers['authorization']);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao retornar dados do usuário" });
    }
  }

  /**
   * Verifies the validity of a provided JWT token.
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  verifyToken = async (req, res) => {
    try {
      const token = this.service.hasToken(req.headers['authorization']);
      this.service.verifyToken(token);
      return res.status(200).json({ message: 'Token válido.' });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  /**
   * Handles the token refresh request to get a new JWT token.
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  refreshToken = async (req, res) => {
    try {
      const { refresh_token } = req.body;
      if (!refresh_token) {
        return res.status(400).json({ message: "Refresh token não fornecido" });
      }

      const newToken = await this.service.refreshAccessToken(refresh_token);
      return res.status(200).json({ token: newToken });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar o token!" });
    }
  }
}

/**
 * Exports the AuthController class.
 * @module AuthController
 */
module.exports = AuthController;
