const express = require('express');
const router = express.Router();

const { createBill,showBills } = require('../controllers/billController');
const { isAuth,isOwner } = require('../middlewares')

router.post('/create', isAuth, isOwner, createBill);

router.get('/show', isAuth, isOwner, showBills);

module.exports = router;