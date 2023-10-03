const passport = require('passport');
const jwt = require('jsonwebtoken');
const AuthRepository = require('../repository/AuthRepository');

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

}

module.exports = AuthService;
