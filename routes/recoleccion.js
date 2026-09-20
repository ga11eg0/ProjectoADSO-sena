const express = require('express'); 
const router = express.Router(); 
const Controler = require('../controllers/controler'); 
const controladorRecoleccion = new Controler();

router.post("/:id",controladorRecoleccion.newRec); 

module.exports = router; 