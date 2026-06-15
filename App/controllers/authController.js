const bcrypt =  require("bcrypt")
const userModel = require("../models/User")

const signUp = async (req,res)=>{

   try{
    const {name,email, password} = req.body
    const user =await userModel.findOne({email})
    if(user){
        return res.status(409).json({message:"user is alredy exist, you can login", success:false})
    }
    let usersModel = new userModel({
        name,
        email,
        password
    })
    usersModel.password = await bcrypt.hash(password,10)
    await userModel.save()
        res.status(201).json({message:"signUp sucessfully",
            success:true
        })
   } catch (err){
        res.status(500).json({message:"Internal server error", success:false,error:err})
   }
}

const login = (req,res)=>{
     let {email, password} = req.body
    let user = new userModel({
        email,
        password
    })
    user.save().then(()=>{
        res.send({status:1,message:"Login sucessfully"})
    }).catch((err)=>{
        console.log(err)
        res.send({status:1,message:"Login does nat sucessfully"})
        
    })
}

module.exports ={signUp,login}