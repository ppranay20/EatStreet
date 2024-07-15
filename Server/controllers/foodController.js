const { Food } = require('../models/foodModel')
const fs = require('fs');

const addFood = async (req,res) => {
    const foodImage = req.file.filename;
    
    const food = new Food({
        ...req.body,
        image : foodImage
    })
    try{
        await food.save();
        res.json({
            success : "true",
            message : "Food added Successfully",
        })
    }catch(err){
        console.log(err);
        res.json({
            success : "false",
            message : "Error in added food"
        })
    }
}

const listFood = async(req,res) => {
    try{
        const food = await Food.find({});
    
        res.json({
            success : true,
            food : food
        })
    }catch(err){
        console.log(err);
        res.json({
            success : false,
            message : "Food not find"
        })
    }
}

const removeFood = async (req,res) => {
    try{
        const id = req.params.id;
        const food = await Food.findById(id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await Food.findByIdAndDelete(req.params.id);
        res.json({
            success : "true",
            message : "Food Removed Successfully"
        })
    }catch(err){
        console.log(err);
        res.json({
            success : "false",
            message : "Food not removed"
        })
    }
}

module.exports = {
    removeFood,
    listFood,
    addFood
}