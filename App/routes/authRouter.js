const express = require("express")
const { signUp, login, getUser } = require("../controllers/authController")
const { signupValidation, loginValidation } = require("../middleware/authValidation")

const authRouter = express.Router()

authRouter.get("/",getUser)
authRouter.post("/signup",signupValidation, signUp)
authRouter.post("/login",loginValidation, login)

module.exports =authRouter