const express = require('express');
const router = express.Router();

const { handleStripe } = require('../controllers/paymentController');
const { isNotAdmin } = require('../middlewares')

router.post('/stripe', handleStripe);

module.exports = router;