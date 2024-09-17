const express = require('express');
const app = express();
const PORT = 3000;
const dbConnection = require('./config/db')
const {router} = require('./routes/foodRoute')
const {userRouter} = require('./routes/userRoute')
const {cartRouter} = require('./routes/cartRoute')
const {orderRouter} = require('./routes/orderRoute')
const cors = require('cors')

dbConnection();

app.use(cors());
app.use(express.json());
app.use("/api/food",router);
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.use('/images',express.static('uploads'))

app.listen(PORT,()=>{
    console.log("Server is running on the port " + PORT);
})