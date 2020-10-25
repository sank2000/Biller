const express = require('express');
const router = express.Router();

const { createBill,showBills,payBill } = require('../controllers/billController');
const { isAuth,isOwner,isNotAdmin,isCustomer } = require('../middlewares')

router.post('/create', isAuth, isOwner, createBill);

router.get('/show', isAuth, isNotAdmin, showBills);

router.post('/pay', isAuth, isCustomer , payBill);

module.exports = router;