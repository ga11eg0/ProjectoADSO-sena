const express = require('express');
const router = express.Router();
const Controler = require('../controllers/controler');
const controler = new Controler;

router.post('/login', controler.autenticarAdmin );
router.post('/logout',controler.logout); 

module.exports = router;