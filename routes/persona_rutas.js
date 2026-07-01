const express = require('express');
const router = express.Router();
const Controler = require('../controllers/controler');

const controladorPersona = new Controler();
router.get('/', controladorPersona.list_persona);
router.post('/', controladorPersona.insert_persona);
router.put('/:id', controladorPersona.update_persona)
router.delete('/:id',controladorPersona.delete_persona)
module.exports = router;