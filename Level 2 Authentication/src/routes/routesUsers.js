const express = require("express");
const routerUser = express.Router();
const modelUser = require("../model/userModel.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../model/blacklisted.model");

routerUser.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  try { 
    const user = await modelUser.findOne({ email });
    if (user) {
      return res.status(400).send("User already exists");
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error while hashing the password" });
        }
        try {
          const newUser = new modelUser({ username, password: hash, email });
          await newUser.save();
          return res
            .status(201)
            .json({ message: "User registered successfully" });
        } catch (error) {
          return res
            .status(500)
            .json({ message: "Error while saving the user" });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error while finding the user" });
  }
});

routerUser.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await modelUser.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          //  access token
          const accessToken = jwt.sign(
            { userID: user.id, username: user.username },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
          );

          //  refresh token
          const refreshToken = jwt.sign(
            { userID: user.id, username: user.username },
            process.env.REFRESH_SECRET_KEY,
            { expiresIn: "7d" }
          );

          res.status(200).json({
            message: "User logged in successfully",
            accessToken,
            refreshToken,
          });
        } else {
          res.status(401).json({
            message: "Wrong password",
          });
        }
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error while logging in",
      error,
    });
  }
});

routerUser.post("/logout", async (req, res) => {
    const { refreshToken } = req.body;
  
    try {
      //refreshToken 
      if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
      }
  
      // adding to Blacklist 
      const blacklistedToken = new BlacklistedToken({ 
        token: refreshToken,
        expiresSt: new Date()
      });
      await blacklistedToken.save();
  
      res.status(200).json({
        message: "Logged out successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while logging out",
        error,
      });
    }
  });
  

module.exports = routerUser;
