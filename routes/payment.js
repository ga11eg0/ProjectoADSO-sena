const express = require('express'); 
const router = express.Router(); 
const Controler = require('../controllers/controler'); 
const controladorPay = new Controler();

router.post("/",controladorPay.genPayment); 

module.exports = router; 