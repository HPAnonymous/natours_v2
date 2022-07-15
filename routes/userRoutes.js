const express = require('express');
const userControllers = require('./../controllers/userControllers');

const userRouter = express.Router();

const route = express.Router();

userRouter.route('/').get(userControllers.getAllUsers).post(userControllers.createUser);
userRouter.route('/:id').get(userControllers.getUser).post(userControllers.deleteUser);

module.exports = userRouter;
