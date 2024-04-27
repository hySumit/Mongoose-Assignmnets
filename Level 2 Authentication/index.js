const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT
const connectToDb = require("./src/config/db")
const routerUser = require('./src/routes/routesUsers')
const routerTodo = require('./src/routes/routesTodo')

const app = express()
app.use(express.json())
app.use("/users",routerUser
)
app.use("/todo",routerTodo)

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(PORT,()=>{
    try {
        connectToDb()
        console.log(`server is running on port ${PORT}`);
    } catch (error) {
        console.log(error);
    }
})