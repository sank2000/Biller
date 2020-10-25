const express = require('express');
const router = express.Router();

const { createBill } = require('../controllers/billController');
const { isAuth,isOwner } = require('../middlewares')

router.post('/create', isAuth, isOwner, createBill);

module.exports = router;