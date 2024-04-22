const express = require("express");
const userModel = require("../models/Schemas");

const userRouter = express.Router();

// get request
userRouter.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

// post request

userRouter.post("/", async (req, res) => {
  try {
    // If user already exists
   
    const existingEmailUser = await userModel.findOne({
      email: req.body.email,
    });
    const existingPhoneUser = await userModel.findOne({
      phone: req.body.phone,
    });

    if (existingEmailUser || existingPhoneUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // else

    const newUser = new userModel(req.body);
    await newUser.save();
    res.json(newUser);

    console.log("user created succesfully");
  } catch (error) {
    console.log(error);
  }
});

// patch request

userRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updateUser = await userModel.findByIdAndUpdate(id, req.body);
    // res.json(updateUser)
    res.status(201).send("User is updated successfully");
  } catch (error) {
    console.log(error);
  }
});

// delete request

userRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await userModel.findByIdAndDelete(id);
    res.status(200).send("user deleted successfully");
  } catch (error) {}
});

module.exports = userRouter;
