const express = require('express');
const router = express.Router();
const { WorkEntry } = require('../models');

router.get('/', async (req, res) => {
    const entries = await WorkEntry.findAll();
    res.json(entries);
});

router.post('/', async (req, res) => {
    const entry = await WorkEntry.create(req.body);
    res.json(entry);
});

module.exports = router;
