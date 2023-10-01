const express = require('express');
const clientsController = require('../controllers/clientsController');

const router = express.Router();

router.get('/clients', clientsController.getAllClients);
router.post('/clients', clientsController.createClient);
router.delete('/clients', clientsController.deleteClient);

module.exports = router;


