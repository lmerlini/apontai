const passport = require('passport');
const jwt = require('jsonwebtoken');
const AuthRepository = require('../repository/AuthRepository');
const UserRepository = require('../repository/UserRepository')

class AuthService {


  static login(req, res) {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user) => {
        if (err) {
          reject(err);
        }

        if (!user) {
          resolve(null);
        }

        req.logIn(user, (err) => {
          if (err) {
            reject(err);
          }

          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '4h'
          });

          resolve(token);
        });
      })(req, res);
    });
  }

  static async register(userData) {
    return AuthRepository.createUser(userData);
  }

  static logout(req) {
    req.logout();
  }

  static async getCurrentUser(token) {

    token = token.split(' ')[1];
    if (!token) {
      throw new Error('Token não fornecido');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserRepository.findById(decoded.id);

    if (user) {
      // TODO: remover alguns dados sensiveis (POR ENQUANTO FOI APENAS PASSWORD)
      delete user.password;
    }

    return user;
  }

}

module.exports = AuthService;
