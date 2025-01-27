const mongoose = require('mongoose');

function connectToDatabase() {
    mongoose.connect("mongodb://localhost:27017/ewebstore", {useNewUrlParser: true})
    .then(()=>{
        console.log("Connected to Database!!");
    }).catch(()=>{
        console.log("Error in establishing Database connection", err);
    });
}

module.exports = connectToDatabase();
