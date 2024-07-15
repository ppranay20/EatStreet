const express = require('express');
const {verifyUser} = require('../middlewares/verifyUser');
const {placeOrder,verifyOrder,userOrder,listOrder,updateStatus} = require('../controllers/orderController');
const orderRouter = express.Router();

orderRouter.post("/place",verifyUser,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post('/myorder',verifyUser,userOrder);
orderRouter.get("/list",listOrder);
orderRouter.post("/status",updateStatus);

module.exports = {
    orderRouter
}