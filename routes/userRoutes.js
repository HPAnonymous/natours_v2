/* eslint-disable import/no-useless-path-segments */
const express = require('express');
const userControllers = require('./../controllers/userControllers');
const authorController = require('./../controllers/authorController');

const userRouter = express.Router();

userRouter.route('/signup').post(authorController.signup);
userRouter.route('/login').post(authorController.login);
userRouter.route('/forgotPassword').post(authorController.forgotPassword);
userRouter.route('/resetPassword/:token').patch(authorController.passwordReset);

userRouter
  .route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);
userRouter
  .route('/:id')
  .get(userControllers.getUser)
  .post(userControllers.deleteUser);

module.exports = userRouter;
