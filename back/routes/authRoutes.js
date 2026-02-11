const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/profile', authMiddleware.verifyToken, authController.getProfile);

router.get(
  '/users',
  authMiddleware.verifyToken,
  authMiddleware.checkRole(['Технический эксперт', 'Главный эксперт']),
  authController.getAllUsers
);

router.post(
  '/users/update-role',
  authMiddleware.verifyToken,
  authMiddleware.checkRole(['Технический эксперт']),
  authController.updateUserRole
);

module.exports = router;
