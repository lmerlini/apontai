const express = require('express');
const { create, destroy, getClientById, list, update, listTotal } = require('../controllers/WorkEntryController');

const router = express.Router();
const PREFIX = "workentries"

router.get(`/${PREFIX}/list`, list);
router.get(`/${PREFIX}/totalwork`, listTotal);
router.get(`/${PREFIX}/list/:client_id`, getClientById);
router.post(`/${PREFIX}/`, create);
router.delete(`/${PREFIX}`, destroy);
router.patch(`/${PREFIX}`, update);

router.use(`/${PREFIX}/*`, (req, res, next) => {
    res.status(404).json({ "message": 'Página não encontrada!' });
});

module.exports = router;
