const express = require('express')
const app = express()
const PORT = 5500
const connectToDb = require('./src/config/db')
const moviesRouter = require('./src/routes/moviesRoute')

app.use(express.json())

app.use('/movies', moviesRouter )

app.get('/', async (req,res)=>{
    await res.send("Welcome to Movie App")
})

app.listen(PORT,()=>{
    try {
        connectToDb()
        console.log(`Server is running on ${PORT}`);
        console.log("connected to databse")
    } catch (error) {
        console.log(error);
    }
})