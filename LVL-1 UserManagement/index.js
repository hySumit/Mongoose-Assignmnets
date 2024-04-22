const express = require('express')
const app = express()
const connectToDb = require('./src/config/db')
const userRouter = require('./src/routes/userRoute')
const productRouter = require('./src/routes/productRoute')

const PORT = 8080
app.use(express.json())

//routes
app.use('/user',userRouter)
app.use('/product',productRouter)


app.get('/',(req,res)=>{
  res.send("Welcome to home route")
})

app.listen(PORT,()=>{
  try {
    connectToDb()
    console.log(`Server is Running on ${PORT}`)
    console.log("connected to databse")
  } catch (error) {
    console.log(error.message)
  }
})