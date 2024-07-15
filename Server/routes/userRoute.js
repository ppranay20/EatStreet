const express = require('express');
const userRouter = express.Router();
const {signup,login} = require('../controllers/userController')
const {verifyUser} = require('../middlewares/verifyUser');

userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.get('/verify',verifyUser)

module.exports = {
    userRouter
}