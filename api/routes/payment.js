const express = require('express');
const router = express.Router();

const { handleStripe,handlePayPal } = require('../controllers/paymentController');
const { isCustomer } = require('../middlewares')

router.post('/stripe',isCustomer, handleStripe);
router.post('/paypal',isCustomer, handlePayPal);

module.exports = router;