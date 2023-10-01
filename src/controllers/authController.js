const passport = require('passport');
const { User } = require('../models');


exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).send('Unauthorized');;
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.status(200).send('Logged in successfully');
    });
  })(req, res, next);
};



exports.logout = (req, res) => {
  req.logout(() => {
    res.json({ "message": "success"});
  });
};

exports.register = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios!' });
  }

  try {
    const user = await User.create({ username, password });
    return res.json(user);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Nome de usuário já está em uso!' });
    }
    next(error);
  }
};