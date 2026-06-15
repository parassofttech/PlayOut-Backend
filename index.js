const express = require("express")
const mongoose = require("mongoose")
const authRouter = require("./App/routes/authRouter")
require("dotenv").config()
const app = express()
app.use(express.json())

app.use("/api/user",authRouter)
app.get("/",(req,res)=>{
    res.send("Backend is Running")
})
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Connected to mongoDB")
    app.listen(process.env.PORT, ()=>{
        console.log("server is run on Port "+process.env.PORT)
    })
})




