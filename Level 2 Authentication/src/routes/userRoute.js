const express = require("express")
const userRouter = express.Router()
const userModel = require('../model/userSchema')
const bcrypt = require('bcrypt')
const auth =require("../middleware/auth.middleware")

// user registeration
userRouter.post("/register",async(req,res)=>{
    const {username,email,password} = req.body 
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
          if (err) {
            res.status(500).json({
              message: "Error while hasing the password",
            });
          }
          console.log(hash);
          const user = new userModel({ username, email, password: hash });
          await user.save();
          res.status(201).json({
            message: "User Registered successfully",
          });
        });
      } catch (error) {
        res.status(500).json({
          message: "Error while registering the user",
          error,
        });
      }
})

//login

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email})
        bcrypt.compare(password, user.password, function(err, result) {
            // result == true
            if(result){
                
            }
        });
    } catch (error) {
        
    }
})

module.exports = userRouter