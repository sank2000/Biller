const express = require('express');
const router = express.Router();

const { createBill,showBills } = require('../controllers/billController');
const { isAuth,isOwner,isNotAdmin } = require('../middlewares')

router.post('/create', isAuth, isOwner, createBill);

router.get('/show', isAuth, isNotAdmin , showBills);

module.exports = router;