const UserRepository = require('../repository/UserRepository');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserRepository.findAll();
    return res.status(200).json(users);

  } catch (error) {
    next(new Error('Erro ao buscar usuários.'));
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.body; 

    const result = await UserRepository.destroy({
      where: { id }
    });

    if (result) {
      return res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } else {
      return res.status(404).json({ message: result });
    }

  } catch (error) {
    console.error('Erro ao deletar o usuário:', error);
    return res.status(500).json({ message: 'Erro ao deletar o usuário.' });
  }
};