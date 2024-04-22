const express = require("express");

const productModel = require("../models/product.Schema");
// const userModel = require("../models/Schemas");

const productRouter = express.Router();

// get request
productRouter.get("/", async (req, res) => {
  try {
    const products = await productModel.find();
    res.send(products);
    // res.json(products)
  } catch (error) {
    console.log(error);
  }
});

// post request

productRouter.post("/", async (req, res) => {
  try {

    const newProduct = new productModel(req.body);
    await newProduct.save();
    res.json(newProduct);

    console.log("New product created successfully");
  } catch (error) {
    console.log(error);
  }
});


// update/patch request

productRouter.patch("/:id", async (req,res)=>{
    const {id} = req.params

    try {
        const updateProduct = await productModel.findByIdAndUpdate(id,req.body)
        res.status(201).send("product updated successfully")
    } catch (error) {
        console.log(error);
    }
})

// delete request 

productRouter.delete("/:id", async (req,res)=>{
    const {id} = req.params

    try {
        const deleteProduct = await productModel.findByIdAndDelete(id)
        res.status(200).send('user deleted successfully')
    } catch (error) {
        console.log(error);
    }
})
module.exports = productRouter;
