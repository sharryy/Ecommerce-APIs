const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.post('/signup', UserController.signUp);

router.post('/login', UserController.logIn)

module.exports = router;