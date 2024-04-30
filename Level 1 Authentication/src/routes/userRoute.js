const express = require('express');
const userRouter = express.Router();
const userModel = require("../models/userSchema");
const jwt = require("jsonwebtoken");

// User registration
userRouter.post("/register", async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        } else {
            await userModel.create({ email, password, username });
            res.status(200).json({ message: "User registered successfully" });
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: "Failed to register user" });
    }
});

// User login
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            userID: user.id, 
            username: user.username
          }, process.env.secretKey);

          
        // console.log(token);
        res.status(200).json({
            message: "User logged in successfully",
            token: token
        });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: "Error while logging in" });
    }
});

module.exports = userRouter;
