const express = require('express');
const routerAuth = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');



routerAuth.post('/register', authController.register);
routerAuth.post('/login', authController.login);
routerAuth.get('/protected', protect, authController.profile);

module.exports = routerAuth;