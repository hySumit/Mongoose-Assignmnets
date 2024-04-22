const { Schema, model } = require("mongoose");

// product's Schema
const productSchema = new Schema(
    {
      name: String,
      price: Number,
      description: String,
      type: String,
      rating: Number,
    },
    { versionKey: false }
  );

const productModel = model("product", productSchema);

module.exports = productModel