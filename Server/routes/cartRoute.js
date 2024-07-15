const express = require('express');
const cartRouter = express.Router();
const {addToCart ,removeFromCart, getDataFromCart} = require('../controllers/cartController');
const { verifyUser } = require('../middlewares/verifyUser')

cartRouter.post('/add',verifyUser,addToCart);
cartRouter.post('/remove',verifyUser,removeFromCart);
cartRouter.post('/get',verifyUser,getDataFromCart)

module.exports = {
    cartRouter
}