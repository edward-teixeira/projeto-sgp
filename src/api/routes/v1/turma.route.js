const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/turma.controller');
const userController = require('../../controllers/user.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
  createTurma,
  updateTurma,
} = require('../../validations/turma.validation');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', userController.load);

router
  .route('/')
  .get(authorize(LOGGED_USER), controller.list)
  .post(authorize(LOGGED_USER), validate(createTurma), controller.create);

router
  .route('/:turmaId')
  .get(authorize(LOGGED_USER), controller.get)
  .put(authorize(LOGGED_USER), validate(updateTurma), controller.update)
  .patch(authorize(LOGGED_USER), validate(updateTurma), controller.replace)
  .delete(authorize(LOGGED_USER), validate(updateTurma), controller.remove);

module.exports = router;
