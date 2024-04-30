const express = require('express')
require('dotenv').config()
const connectionDb = require('./src/config/db')
const routerUser = require('./src/routes/routes.user')
const PORT = process.env.PORT || 5122

const app = express()

app.use(express.json())
app.use("/user",routerUser)

app.get("/",(req,res)=>{
    res.send("Welcome to Role Based Access Level-1")
})

app.listen(PORT,()=>{
    try {
        connectionDb()
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.log(error);
    }
})
