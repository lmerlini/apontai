const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const PREFIX = "auth"


router.post(`/${PREFIX}/login`, authController.login);
router.post(`/${PREFIX}/register`, authController.register);
router.get(`/${PREFIX}/logout`, authController.logout);

router.use(`/${PREFIX}/*`, (req, res, next) => {
    res.status(404).json({ "message": 'Página não encontrada!' });
});

module.exports = router;
