const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
    },
    email : {
        type : String,
        unique : true,
    },
    password : {
        type : String,
    },
    cartData : {
        type : Object,
        default : {}
    }
},{minimize : false})

const User = mongoose.model("User",userSchema);

module.exports = User;