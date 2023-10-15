const express = require('express');
const clientsController = require('../controllers/ClientsController');

const router = express.Router();
const PREFIX = "clients"

router.get(`/${PREFIX}`, clientsController.getAllClients);
router.post(`/${PREFIX}`, clientsController.createClient);
router.put(`/${PREFIX}/:id`, clientsController.updateClient);
router.delete(`/${PREFIX}/:id`, clientsController.deleteClient); 

router.use(`/${PREFIX}/*`, (req, res, next) => {
    res.status(404).json({ "message": 'Página não encontrada!' });
});

module.exports = router;


