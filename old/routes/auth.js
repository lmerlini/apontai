const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard', // rota após login bem-sucedido
  failureRedirect: '/login',     // rota após falha no login
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
