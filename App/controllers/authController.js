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
        {expiresIn: '7d'}
)
     res.status(201).json({message:"signUp sucessfully",
            success:true,
            jwtToken,
            id:user.id,
            email:user.email,
            name: user.name,
            user:user
            

        })
   } catch (err){
        res.status(500).json({message:"Internal server error", success:false,error:err})
   }
}

const getUser= async(req,res)=>{
    try{
        const user = await userModel.find()
        res.status(201).json({
            success:true,
            message:"users view",
            user:user
        })
    } catch(err){
         res.status(201).json({
            success:false,
            message:"users not view"
        })
    }
}

const deleteUser = async(req,res)=>{
    try{
        const userId = req.params.id
        const user = await userModel.deleteOne({_id:userId})
        res.status(201).json({
            success:true,
            message:"users deleted",
            id:user._id,
            user:user
        })
    } catch(err){
         res.status(201).json({
            success:false,
            message:"users not deleted",
            error:err
        })
    }
}

const blockUser = async (req,res)=>{
  try {
    const userId = req.params.id;

    const user = await userModel.findById(userId);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    user.blocked = !user.blocked; // toggle
    await user.save();

    res.json({ success: true, message: `User ${user.blocked ? "blocked" : "unblocked"} successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports ={signUp,login,getUser,
    deleteUser,
    blockUser
}