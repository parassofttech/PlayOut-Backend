const bcrypt =  require("bcrypt")
const jwt = require("jsonwebtoken")
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
    await usersModel.save()
        res.status(201).json({message:"signUp sucessfully",
            success:true
        })
   } catch (err){
        res.status(500).json({message:"Internal server error", success:false,error:err})
   }
}

const login = async(req,res)=>{
    try{

       const {email,password}= req.body
       const user = await userModel.findOne({email})
       if(!user){
        return res.status(409).json({message:"Auth failed user or password does not exist"})
       }
      const isPassword = await bcrypt.compare(password,user.password)
      if(!isPassword){
        return res.status(409).json({message:"Auth failed user or password does not exist"})
      }

      const jwtToken = jwt.sign(
        {email:user.email,_id:user._id},
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
)
     res.status(201).json({message:"signUp sucessfully",
            success:true,
            jwtToken,
            email,
            name: user.name,
            email: user.email,

        })
   } catch (err){
        res.status(500).json({message:"Internal server error", success:false,error:err})
   }
}

module.exports ={signUp,login}