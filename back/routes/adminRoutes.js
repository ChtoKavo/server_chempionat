const express = require('express');
const router = express.Router();
const userController = require('../controller/create.gexp.exp.part');
const eventController = require('../controller/module.create');
const authMiddleware = require('../middleware/authMiddleware');

router.post(
  '/chief-experts',
  authMiddleware.verifyToken,
  authMiddleware.checkRole(['tex']),
  userController.createChiefExpert
);

router.post(
  '/participants',
  authMiddleware.verifyToken,
  authMiddleware.checkRole(['tex']),
  userController.createParticipant
);

router.delete(
  '/users',
  authMiddleware.verifyToken,
  authMiddleware.checkRole(['tex']),
  userController.deleteUser
);

router.get(
  '/users',
  authMiddleware.verifyToken,
  authMiddleware.checkRole(['tex']),
  userController.getAllUsersEmails
);

router.post(
  '/events',
  authMiddleware.verifyToken,
  authMiddleware.checkRole(['tex']),
  eventController.createEvent
);

router.post(
  '/modules',
  authMiddleware.verifyToken,
  authMiddleware.checkRole(['tex']),
  eventController.createModule
);

router.delete(
  '/events',
  authMiddleware.verifyToken,
  authMiddleware.checkRole(['tex']),
  eventController.deleteEvent
);

router.delete(
  '/modules',
  authMiddleware.verifyToken,
  authMiddleware.checkRole(['tex']),
  eventController.deleteModule
);

router.get(
  '/events',
  authMiddleware.verifyToken,
  authMiddleware.checkRole(['tex']),
  eventController.getAllEvents
);

router.get(
  '/events/:eventId',
  authMiddleware.verifyToken,
  authMiddleware.checkRole(['tex']),
  eventController.getEventById
);

module.exports = router;
