const User = require('../models/userModel');

const addToCart = async (req,res) => {
    try{
        const user = await User.findOne({_id : req.body.userId});
        const cartData = user.cartData;
    
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId]++;
        }
    
        await User.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({
            success : true,
            message : "Added To Cart"
        })
    }
    catch(err){
        console.log(err);
        res.json({
            success : false,
            message : "Error"
        })
    }
}

const removeFromCart = async (req,res) => {
    const user = await User.findOne({_id : req.body.userId});
    const cartData = await user.cartData;

    if(cartData[req.body.itemId] > 0){
        cartData[req.body.itemId]--;
        await User.findByIdAndUpdate(req.body.userId,{cartData});   

        res.json({
            success : true,
            message : "Removed From the cart"
        })
    }
    else{
        res.json({
            success : false,
            message : "Item not present in the cart"
        })
    }
}

const getDataFromCart = async (req,res) => {
    const user = await User.findOne({_id : req.body.userId});
    const cartData = user.cartData;

    if(cartData){
        res.json({
            success : true,
            cartData : cartData
        })
    }
    else{
        res.json({
            success : false,
            message : "No items exist in cart"
        })
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    getDataFromCart
}