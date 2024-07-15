const User = require("../models/userModel");
const {Order} = require("../models/orderModel")
const Stripe = require('stripe');
require('dotenv').config()

const stripe = new Stripe(process.env.Stripe_Secret_Key)

const placeOrder = async (req,res) => {
    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new Order({
            userId : req.body.userId,
            items : req.body.items,
            amount : req.body.amount,
            address : req.body.address
        })

        const {promocode} = req.body;
        
        await newOrder.save();
        await User.findByIdAndUpdate(req.body.userId,{cartData : {}});

        const line_items = req.body.items.map((item)=>({
            price_data : {
                currency : "usd",
                product_data    : {
                    name : item.name
                },
                unit_amount : item.price*100
            },
            quantity : item.quantity
        })) 

        line_items.push({
            price_data : {
                currency : "usd",
                product_data : {
                    name : "Delievery Charges"
                },
                unit_amount : promocode ? 1*100 : 2*100
            },
            quantity : 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode : 'payment',
            success_url : `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({
            success : true,
            sessionUrl : session.url
        })
    } catch (err) {
        console.log(err)
        res.json({
            success : false,
            message : "Error"
        })
    }
}

const verifyOrder = async (req,res) =>{
    const {success,orderId} = req.body;

    try {
        if(success === "true"){
            await Order.findByIdAndUpdate(orderId,{success : true});
            res.json({
                success : true,
                message : "Paid"
            })
        }else{
            await Order.findByIdAndDelete(orderId);
            res.json({
                succes : false,
                message : "Not Paid"
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            message : "Error"
        })
    }
}

const userOrder = async (req,res) =>{
    try {
        const order = await Order.find({userId : req.body.userId});
        if(order){
            res.json({
                success : true,
                order : order
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            message : "Error"
        })
    }
}

const listOrder = async (req,res) =>{
    try{
        const order = await Order.find({});
        res.json({
            success : true,
            orders : order
        })
    }
    catch(err){
        console.log(err)
        res.json({
            success : false,
            message : "Error"
        })
    }
}

const updateStatus = async (req,res) =>{
    try {
        const order = await Order.findByIdAndUpdate(req.body.orderId,{status : req.body.status});
        res.json({
            success : true,
            message : "Status Updated"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            message : "Error"
        })
    }
}

module.exports = {
    placeOrder,
    verifyOrder,
    userOrder,
    listOrder,
    updateStatus
}