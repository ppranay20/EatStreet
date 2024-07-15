const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyUser = async (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1];
    try{
        if(!token){
            res.json({
                success : "false",
                message : "token not sent"
            })
        }
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(decoded){
            req.body.userId = decoded.id;
            next();
        }
        else{
            res.json({
                success : "false",
            })
        }
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {verifyUser};