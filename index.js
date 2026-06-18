const express = require("express")
const mongoose = require("mongoose")
const authRouter = require("./App/routes/authRouter")
const bodyParser = require("body-parser")
const cors = require("cors")
const dbconnection = require("./db")
const contactRouter = require("./App/routes/contactRouter")
require("dotenv").config()


const app = express()
app.use(express.json())

dbconnection()

app.get("/",(req,res)=>{
    res.send("Backend is Running")
})

app.use(bodyParser.json())
app.use(cors())

app.use("/api/user",authRouter)
app.use("/api/contact", contactRouter);

app.listen(process.env.PORT, ()=>{
        console.log("server is run on Port "+process.env.PORT)

})




