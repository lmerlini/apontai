const UserService = require('../service/UserService');

/**
 * Controller for user-related operations.
 */
class UserController {

  constructor() {
    this.service = new UserService()
  }
  /**
  * Retrieves all users from the database.
  * 
  * @param {express.Request} req - Express request object.
  * @param {express.Response} res - Express response object.
  * @returns {express.Response} - Response object with the status and the list of users or error message.
  */
  async getAllUsers(req, res) {
    try {
      const users = await this.service.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar usuários.', error: error });
    }
  }

  /**
   * Deletes a user by ID.
   * 
   * @param {express.Request} req - Express request object.
   * @param {express.Response} res - Express response object.
   * @returns {express.Response} - Response object with the status and success or error message.
   */
  async deleteUser(req, res) {
    try {
      const { id } = req.body;
      const result = await this.service.deleteUserById(id);

      if (result.success) {
        return res.status(200).json({ message: result.message });
      } else {
        return res.status(404).json({ message: result.message });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar o usuário.' });
    }
  }
}

/**
 * Exporting an instance of UserController for user-related operations.
 * @type {UserController}
 */
module.exports = UserController;
