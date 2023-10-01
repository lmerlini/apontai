const express = require('express');
const workEntriesController = require('../controllers/workEntriesController');

const router = express.Router();

router.get('/works', workEntriesController.list);
router.get('/work/:client_id', workEntriesController.getById);
router.post('/work', workEntriesController.create);
router.delete('/work', workEntriesController.delete);
router.patch('/work', workEntriesController.update);

module.exports = router;
