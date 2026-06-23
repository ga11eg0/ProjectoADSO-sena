const express = require('express');
const router = express.Router();
const Controler = require('../controllers/controler');

const controladorPersona = new Controler();
router.get('/personas', controladorPersona.list_persona);
router.post('/personas', controladorPersona.insert_persona);
router.put('/personas/:id', controladorPersona.update_persona)
router.delete('/personas/:id',controladorPersona.delete_persona)
module.exports = router;