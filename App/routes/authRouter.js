const express = require("express")
const { signUp } = require("../controllers/authController")

const authRouter = express.Router()

authRouter.post("/signup",signUp)

module.exports =authRouter