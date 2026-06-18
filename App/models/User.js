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
    blocked: { type: Boolean, default: false },
     emailVerified: {
        type: Boolean,
        default: false
    },
},{ timestamps: true })

let userModel = mongoose.model("user",userAuthSchema)

module.exports= userModel