const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController');

userRouter.post('/', userController.forgotPassword);
userRouter.post('/login',userController.login);
userRouter.post('/register', userController.register);
userRouter.get('/reset-password/:token', userController.getResetPassword);
userRouter.post('/reset-password/:token', userController.postResetPassword);


module.exports = userRouter;