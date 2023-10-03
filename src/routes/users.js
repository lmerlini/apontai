const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser } = require('../controllers/userController'); // Ajuste o caminho do controller conforme necessário

const PREFIX = "users"
router.get(`/${PREFIX}/list`, getAllUsers);
router.delete(`/${PREFIX}/delete`, deleteUser);

router.use(`/${PREFIX}/*`, (req, res, next) => {
    res.status(404).json({ "message": 'Página não encontrada!' });
});

module.exports = router;
