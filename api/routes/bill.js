const express = require('express');
const router = express.Router();

const { createBill,showBills,payBill,showNotPaidBills,showPaidBills } = require('../controllers/billController');
const { isAuth,isOwner,isNotAdmin,isCustomer } = require('../middlewares')

router.post('/create', isAuth, isOwner, createBill);

router.get('/show', isAuth, isNotAdmin, showBills);

router.get('/showpaid', isAuth, isNotAdmin, showPaidBills);

router.get('/shownotpaid', isAuth, isNotAdmin, showNotPaidBills);

router.post('/pay', isAuth, isCustomer , payBill);

module.exports = router;