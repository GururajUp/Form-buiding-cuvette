const express = require('express');
const router = express.Router();
const { signup, login, updateUser,userDetails } = require('../controllers/auth');

router.post('/signup', signup);

router.post('/login', login);

router.put('/updateuser/:userId', updateUser);  // New route for updating user details

router.get("/userdetails/:id", userDetails);

module.exports = router;