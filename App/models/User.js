const mongoose = require("mongoose")

const userAuthSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
})

let userModel = mongoose.model("user",userAuthSchema)

module.exports= userModel