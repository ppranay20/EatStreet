const express = require('express');
const router = express.Router();
const multer = require('multer');
const {addFood,listFood,removeFood} = require('../controllers/foodController')

const storage = multer.diskStorage({
    destination : "uploads",
    filename : (res,file,cb) => {
        cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage});

router.post("/add",upload.single('image'),addFood);
router.get("/list",listFood);
router.delete("/remove/:id",removeFood);

module.exports = {router}