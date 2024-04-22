const { Schema, model } = require("mongoose");

// user's Schema
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    gender: { type: String, enum: ["male", "female", "others"] },
    city: { type: String },
  },
  { versionKey: false }
);

// userModel
const userModel = model("User", userSchema);

module.exports = userModel;
