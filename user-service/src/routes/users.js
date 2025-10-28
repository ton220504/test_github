const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/',userController.getAllUsers);
router.get('/:id',userController.getUserById);
router.post('/',userController.createUser);
router.put('/:id',userController.updateUser);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/protected', protect, authController.profile);

module.exports = router;