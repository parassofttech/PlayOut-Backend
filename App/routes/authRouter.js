const express = require("express")
const { signUp, login, getUser, deleteUser, blockUser } = require("../controllers/authController")
const { signupValidation, loginValidation } = require("../middleware/authValidation")

const authRouter = express.Router()

authRouter.get("/",getUser)
authRouter.post("/signup",signupValidation, signUp)
authRouter.post("/login",loginValidation, login)
authRouter.delete("/delete/:id",deleteUser)
authRouter.put("/users/:id/toggleBlock",blockUser)


module.exports =authRouter