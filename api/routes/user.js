const express = require('express');
const router = express.Router();

const { getUser,getUserbyId,getAllUser } = require('../controllers/userController');
const { isAuth,isOwner,isAdmin } = require('../middlewares')

router.get('/customer', isAuth, isOwner, getUser);

router.get('/all', isAuth, isAdmin, getAllUser);

router.post('/id', isAuth, getUserbyId);

module.exports = router;