const passport = require('passport');
const jwt = require('jsonwebtoken');
const AuthRepository = require('../repository/AuthRepository');
const UserRepository = require('../repository/UserRepository');

require('dotenv').config();

class AuthService {

  login(req, res) {
    const isProduction = process.env.NODE_ENV === 'production';
    const tokenExpiry = isProduction ? '20m' : '9999y';
    const refreshTokenExpiry = isProduction ? '7d' : '9999y';
    return new Promise((resolve, reject) => {
      passport.authenticate('local', async (err, user) => {      

        if (err) {
          reject(err);
        }

        if (!user) {
          resolve(null);
          return;
        }

        req.logIn(user, async (err) => {
          if (err) {
            reject(err);
          }

          const token = jwt.sign({ id: user.id, name: user.name, device: req.headers['user-agent'] }, process.env.JWT_SECRET, {
            expiresIn: tokenExpiry
          });

          const refreshToken = jwt.sign({ id: user.id, name: user.name, device: req.headers['user-agent'] }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: refreshTokenExpiry
          });

          resolve({ token, refreshToken });
        });
      })(req, res);
    });
  }

  generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
  }

  async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  }

  getNewAccessToken(refreshToken) {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    return this.generateAccessToken({ id: decoded.id });
  }

  async register(userData) {
    return AuthRepository.createUser(userData);
  }

  logout(req) {
    return new Promise((resolve, reject) => {
      req.logout((err) => {

        if (err) {
          reject(err);
        }
        else {
          resolve();
        }
      });
    });
  }

  async getCurrentUser(token) {
    const decoded = jwt.verify(this.hasToken(token), process.env.JWT_SECRET);
    const user = await UserRepository.findById(decoded.id);

    if (user) {
      delete user.password;
    }

    return user;
  }

  hasToken(token) {
    if (!token) {
      throw new Error('Token não fornecido.');
    }
    const parts = token.split(' ')

    if (parts.length !== 2) {
      throw new Error('Formato de token inválido.');
    }

    const scheme = parts[0];
    const jwtToken = parts[1];

    if (!/^Bearer$/i.test(scheme)) {
      throw new Error('Formato do token malformatado.');
    }

    console.log(jwtToken)

    return jwtToken;
  }

  async refreshAccessToken(refreshToken) {
    try {
      await this.verifyRefreshToken(refreshToken);
      return this.getNewAccessToken(refreshToken);
    } catch (error) {
      throw new Error("Refresh token inválido ou expirado");
    }
  }

  verifyToken(token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return true;
    } catch (error) {
      throw new Error("Refresh token inválido ou expirado");
    }
  }
}

module.exports = AuthService;
