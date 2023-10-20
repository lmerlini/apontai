const passport = require('passport');
const jwt = require('jsonwebtoken');
const AuthRepository = require('../repository/AuthRepository');
const UserRepository = require('../repository/UserRepository');
const TokenRepository = require('../repository/TokenRepository')
require('dotenv').config();

class AuthService {

  login(req, res) {
    console.log(req);
    return new Promise((resolve, reject) => {
      passport.authenticate('local', async (err, user) => {

        if (err) {
          reject(err);
        }


        if (!user) {
          resolve(null);
        }

        req.logIn(user, async (err) => {
          if (err) {
            reject(err);
          }

          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '20m'
          });

          const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '7d'
          });

          // Armazenar refresh token no banco de dados
          await TokenRepository.createToken({
            userId: user.id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
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
    const storedToken = await TokenRepository.getTokenByValue(refreshToken);
    if (!storedToken) throw new Error("Refresh token not found");

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    return storedToken;
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
        if (err) reject(err);
        else resolve();
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
    return token = token.split(' ')[1];
  }

  async refreshAccessToken(refreshToken) {
    try {
      await this.verifyRefreshToken(refreshToken); // Verifica se o refreshToken é válido
      return this.getNewAccessToken(refreshToken); // Retorna um novo accessToken
    } catch (error) {
      throw new Error("Refresh token inválido ou expirado");
    }
  }

  verifyToken(token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return true;
    } catch (error) {
      throw new Error('Token inválido.');
    }
  }
}

module.exports = AuthService;
