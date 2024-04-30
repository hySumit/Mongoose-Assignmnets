const express = require("express");
const bcrypt = require("bcrypt");
const routerUser = express.Router();
const usermodel = require("../model/user");
const jwt = require("jsonwebtoken");

routerUser.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await usermodel.findOne(email);

    if (user) {
      res.status(400).send("User Already Exist");
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          res.status(400).send("Error while hashing the password");
        }
        try {
          const newUser = new usermodel({ username, email, password: hash });
          await newUser.save();
          return res.status(201).send("User Registerd Successfully");
        } catch (error) {
          return res
            .status(500)
            .send("Error while saving user details to database");
        }
      });
    }
  } catch (error) {
    res.status("Error while finding the user");
  }
});

routerUser.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usermodel.findOne({email});
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if(err){
            res.status(500).send("error while comparing the password")
        }
        if (result) {
          const accessToken = jwt.sign(
            {
              userID: user.id,
              userName: user.username,
            },
            process.env.SECRET_KEY,
            { expiresIn: "1hr" }
          );

          const refreshToken = jwt.sign(
            {
              userID: user.id,
              userName: user.username,
            },
            process.env.SECRET_KEY,
            { expiresIn: "5hr" }
          );
          res.status(200).json({
            message:"User logged-in successfully",
            acess:accessToken,
            refresh:refreshToken
          })
        }else{
            res.status(401).send("Invalid User Credentials")
        }
      });
    }else{
        res.status(400).send("User Not Found")
    }
  } catch (error) {
    res.status(300).send("Error while logging in")
  }
});

module.exports = routerUser;
