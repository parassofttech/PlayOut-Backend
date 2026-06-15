const mongoose = require("mongoose")
require("dotenv").config()


const dbconnection = ()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Connceted to MongoDB")
}).catch((err)=>{
    console.log("mongoDB is not connected")
})
}

module.exports = dbconnection