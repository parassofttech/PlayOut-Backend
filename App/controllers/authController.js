const userModel = require("../models/User")

const signUp = (req,res)=>{

    let {name,email, password} = req.body
    let user = new userModel({
        name,
        email,
        password
    })
    user.save().then(()=>{
        res.send({status:1,message:"signUp sucessfully"})
    }).catch((err)=>{
        res.send({status:1,message:"signUp does nat sucessfully"})
    })
}

module.exports ={signUp}