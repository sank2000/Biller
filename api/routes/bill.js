const express = require('express');
const router = express.Router();

const { createBill } = require('../controllers/billController');
const { isAuth } = require('../middlewares')

router.post('/create',isAuth,createBill);

module.exports = router;