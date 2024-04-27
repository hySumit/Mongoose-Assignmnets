const express = require('express')
const routerTodo = express.Router()
const modelTodo = require('../model/todoModel.schema')
const auth = require('../middleware/authentication')


// create
routerTodo.post('/create',auth,async(req,res)=>{
    const {username,userID,taskname,author,isCompleted} = req.body
    try {
        const todo = new modelTodo({username,userID,taskname,author,isCompleted})
        await todo.save()
        res.status(201).json({
            message: "Todo created successfully"
        });
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({
            message: "Error while creating todo",
            error: error.message
        });
    }
})

// get
routerTodo.get("/",auth,async (req,res)=>{
    const {userID} = req.body
    try {
        const todos = await modelTodo.find({userID})
        res.status(200).json({
            message:"Recived all todos",todos
        })
    } catch (error) {
        
        res.status(200).json({
            message:"Error fetching todos"
        })
    }
})

// patch
routerTodo.patch("/update/:id", auth , async(req,res)=>{
    const {id} = req.params

    try {
        const updateTodo = await modelTodo.findByIdAndUpdate(id,req.body)

        res.status(201).json({
            message:`Todo Updated successfully with id : ${id}`
        })
    } catch (error) {
        res.status(500).send("Error updating the todo, please try again")
    }
})

// delete
routerTodo.delete("/delete/:id", auth , async(req,res)=>{
    const {id} = req.params
    try {
        const deleteTodo = await modelTodo.findByIdAndDelete(id)

        res.status(201).json({
            message:`Todo deleted successfully with id : ${id}`
        })
    } catch (error) {
        res.status(500).send("Error deleting the todo, please try again")
    }
})


module.exports = routerTodo