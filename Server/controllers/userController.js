const zod = require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const signupSchema  = zod.object({
    username : zod.string(),
    email : zod.string().email(),
    password : zod.string().min(6)
})

const loginSchema = zod.object({
    email : zod.string(),
    password : zod.string()
})

const signup = async (req,res) => {
    const user = req.body;

    const {success} = signupSchema.safeParse(user);
    if(!success){
        if(user.password.length < 6){
            res.json({
                    success : "false",
                    message : "Enter a strong password"
                })    
        }
        else{
            res.json({
                success : "false",
                message : "Wrong inputs"
            })
        }
        return;
    }
    try{
        const exist = await User.findOne({email : user.email});
        if(exist){
            res.json({
                success : "false",
                message : "User already exist"
            })
            
            return;
        }
        
        const hashedPassword = await bcrypt.hash(user.password,10);

        const newUser = new User({
            username : user.username,
            email : user.email,
            password : hashedPassword
        })

        await newUser.save();
        const token = jwt.sign({id : newUser._id},process.env.JWT_SECRET,{expiresIn : '24h'});

        res.json({
            success : "true",
            message : "New user created",
            token : 'Bearer ' + token
        })

    }catch(err){
        console.log(err)
    }
}

const login = async (req,res) => {
    const user = req.body;

    const {success} = loginSchema.safeParse(user);

    if(!success){
        res.json({
            success : "false",
            message : "Wrong Credentials"
        })
    }

    const existUser = await User.findOne({email : user.email});
    if(!existUser){
        res.json({
            success : "false",
            message : "Incorrect Email or Password"
        })
    }

    const auth = await bcrypt.compare(user.password,existUser.password);
    if(!auth){
        res.json({
            success : "false",
            message : "Incorrect Email or Password"
        })
    }

    const token = jwt.sign({id : existUser._id},process.env.JWT_SECRET,{expiresIn : '24h'});
    res.json({
        success : "true",
        message : "Logged In Successfully",
        token : "Bearer " + token
    })
}

module.exports = {
    signup,
    login
}