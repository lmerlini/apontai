const AuthService = require('../service/AuthService');

class AuthController {

  static async login(req, res, next) {
    try {
      // TODO...: Implementar o remember-me com duração maior quando o usuário selecionar
      const token = await AuthService.login(req, res);
      if (token) {
        return res.json({ message: 'Logged in successfully', token });
      } else {
        return res.status(401).send('Unauthorized');
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
    res.json({ "message": "Logged out successfully" });
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

}

module.exports = AuthController;
