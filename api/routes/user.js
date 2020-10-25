const express = require('express');
const router = express.Router();

const { getUser,getUserbyId } = require('../controllers/userController');
const { isAuth,isOwner } = require('../middlewares')

router.get('/customer', isAuth, isOwner, getUser);

router.post('/id', isAuth, getUserbyId);

module.exports = router;