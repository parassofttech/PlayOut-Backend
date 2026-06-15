const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()
app.use(express.json())



mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Connected to mongoDB")
    app.listen(process.env.PORT, ()=>{
        console.log("server is run on Port "+process.env.PORT)
    })
})




