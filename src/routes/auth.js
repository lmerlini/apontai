const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

const PREFIX = "auth";

router.post(`/${PREFIX}/login`, AuthController.login);
router.post(`/${PREFIX}/verify-token`, AuthController.verifyToken);
router.post(`/${PREFIX}/register`, AuthController.register);
router.get(`/${PREFIX}/logout`, AuthController.logout);


router.use(`/${PREFIX}/*`, (req, res, next) => {
    res.status(404).json({ "message": 'Página não encontrada!' });
    return
});

module.exports = router;
