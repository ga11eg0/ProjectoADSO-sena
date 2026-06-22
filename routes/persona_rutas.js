const express = require('express');
const router = express.Router();
const Controler = require('../controllers/controler');

const controladorPersona = new Controler();
router.get('/personas', controladorPersona.list_persona);

module.exports = router;