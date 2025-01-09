const express = require('express');
const paystackController = require('../controller/paymentController');

const router = express.Router();

router.post('/pay', paystackController);



module.exports = router;
  