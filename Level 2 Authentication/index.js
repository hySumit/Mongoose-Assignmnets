const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const connection = require("./src/config/db");
const userRouter = require("./src/routes/userRoute");
const dotenv= require('dotenv').config()

app.use(express.json());
app.use('/user',userRouter)

//homepage
app.get("/", async (req, res) => {
  try {
    res.status(200).send("Welcome to homepage");
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  try {
    connection
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
