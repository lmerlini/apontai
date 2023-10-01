const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser } = require('../controllers/UserController'); // Ajuste o caminho do controller conforme necessário

const PREFIX = "users"
router.get(`/${PREFIX}/list`, getAllUsers);
router.delete(`/${PREFIX}/delete`, deleteUser);

module.exports = router;
