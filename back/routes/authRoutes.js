const express = require('express');
const router = express.Router();
const authController = require('../controller/login.register');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get(
  '/users',
  authMiddleware.verifyToken,
  authMiddleware.checkRole(['tex', 'gexp']),
  authController.getAllUsers
);

router.post(
  '/users/update-role',
  authMiddleware.verifyToken,
  authMiddleware.checkRole(['tex']),
  authController.updateUserRole
);

module.exports = router;
