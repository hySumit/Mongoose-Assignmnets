const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5500
const connection = require('./src/config/db')
const userRouter = require('./src/routes/userRoute')
const todoRouter = require('./src/routes/todoRouter')

app.use(express.json())
app.use('/user',userRouter)
app.use('/todo',todoRouter)


//homepage
app.get("/", async (req,res)=>{
    try {
        res.status(200).send("Welcome to Authentication Level 1")
    } catch (error) {
        res.status(500).send({message:"Bad request",error})
    }
})

//connecting to server
app.listen(PORT,()=>{
    try {
        connection()
        console.log(`server is running on port: ${PORT}`);
        
    } catch (error) {
        console.log(error);
    }
})