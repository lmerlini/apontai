const AuthService = require('../service/AuthService');

class AuthController {

  static async login(req, res, next) {
    try {
      
      const token = await AuthService.login(req, res);
      if (token) {
        return res.json({ message: 'Logged in successfully', token });
      } else {
        return res.status(401).send('Unauthorized');
      }
    } catch (error) {
      next(error);
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

}

module.exports = AuthController;
