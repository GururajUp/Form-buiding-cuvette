const express = require('express');
const router = express.Router();
const validateLogin = require('../middleware/validateLogin');

const { signup, login, updateUser,userDetails } = require('../controllers/auth');

router.post('/signup',  signup);

router.post('/login', validateLogin, login);

router.put('/updateuser/:userId',  updateUser);

router.get('/userdetails/:id', userDetails);

module.exports = router;