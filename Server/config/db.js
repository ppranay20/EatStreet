const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then((res) => console.log("Database Connected Successfully"))
        .catch((err) => console.log("Error in connecting to databse -> " + err))
}

module.exports = dbConnection;