const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect("mongodb+srv://20pranayparakh:XAUWbIARWrFFsWFm@cluster0.6ufulsd.mongodb.net/")
        .then((res) => console.log("Database Connected Successfully"))
        .catch((err) => console.log("Error in connecting to databse -> " + err))
}

module.exports = dbConnection;