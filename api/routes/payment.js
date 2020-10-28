const express = require('express');
const router = express.Router();

const { handleStripe,handlePayPal } = require('../controllers/paymentController');
const { isNotAdmin } = require('../middlewares')

router.post('/stripe', handleStripe);
router.post('/paypal', handlePayPal);

module.exports = router;