const passport = require('passport');
const jwt = require('jsonwebtoken');
const AuthRepository = require('../repository/AuthRepository');
const UserRepository = require('../repository/UserRepository');

require('dotenv').config();

class AuthService {

  constructor() {
    this.auth = new AuthRepository()
    this.userRepo = new UserRepository()
  }

  /**
  * Authenticate a user and generate access and refresh tokens.
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @returns {Promise<Object>} An object containing the access and refresh tokens.
  */
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

          await this.auth.updateLastLogin(user.id);

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

  /**
   * Generate a new access token.
   * @param {Object} payload - The payload to be encoded into the token.
   * @returns {string} A JWT access token.
   */
  generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
  }

  /**
   * Verify the validity of a refresh token.
   * @param {string} refreshToken - The refresh token to verify.
   * @returns {Object} The decoded JWT payload.
   */
  async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  }

  /**
   * Generate a new access token using a refresh token.
   * @param {string} refreshToken - The refresh token.
   * @returns {string} A new JWT access token.
   */
  getNewAccessToken(refreshToken) {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    return this.generateAccessToken({ id: decoded.id });
  }


  /**
   * Log out the authenticated user.
   * @param {Object} req - The request object.
   * @returns {Promise} Resolves when the logout operation is completed.
   */
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

  /**
   * Retrieve the current authenticated user's information using a token.
   * @param {string} token - The JWT access token.
   * @returns {Promise<Object>} The authenticated user object.
   */
  async getCurrentUser(token) {
    const decoded = jwt.verify(this.hasToken(token), process.env.JWT_SECRET);
    const user = await this.userRepo.findById(decoded.id);

    if (user) {
      delete user.password;
    }

    return user;
  }

  /**
   * Extract and validate the JWT token from the authorization header.
   * @param {string} token - The authorization header containing the token.
   * @returns {string} The JWT token.
   */
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

    return jwtToken;
  }

  /**
   * Refresh the access token using a provided refresh token.
   * @param {string} refreshToken - The refresh token.
   * @returns {string} A new JWT access token.
   */
  async refreshAccessToken(refreshToken) {
    try {
      await this.verifyRefreshToken(refreshToken);
      return this.getNewAccessToken(refreshToken);
    } catch (error) {
      throw new Error("Refresh token inválido ou expirado");
    }
  }

  /**
  * Verify the validity of a provided JWT token.
  * @param {string} token - The JWT token to verify.
  * @returns {boolean} True if the token is valid, throws an error otherwise.
  */
  verifyToken(token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return true;
    } catch (error) {
      throw new Error("Refresh token inválido ou expirado");
    }
  }
}

/**
 * Exports the AuthService class.
 * @module AuthService
 */
module.exports = AuthService;
