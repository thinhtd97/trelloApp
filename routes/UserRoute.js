const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const middleware = require('../middlewares/middlewares')

router.post('/login', UserController.login);
router.post('/register', UserController.register);

module.exports = router;