const express = require('express');
const router = express.Router();

const { register, login, getUser, updateUser } = require('../controllers/userController');
const { isLoggedIn } = require('../middlewares/auth');

router.post('/register', register);
router.post('/signin', login);
router.put('/', isLoggedIn, updateUser);
router.get('/', isLoggedIn, getUser);

module.exports = router;