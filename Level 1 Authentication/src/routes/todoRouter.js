const express = require('express');
const todoRouter = express.Router();
const todoModel = require('../models/todoSchema');
const auth = require('../middleware/auth.middleware');


// create 
todoRouter.post("/create", auth, async (req, res) => {
    const { username, userID, taskname, author, isCompleted } = req.body;
    try {
        const todo = new todoModel({ username, userID, taskname, author, isCompleted });
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
});

// get request 
todoRouter.get("/",auth,async (req,res)=>{
    const {userID} = req.body
    try {
        const todos = await todoModel.find({userID})
        res.status(200).json({
            message:"Recived all todos",todos
        })
    } catch (error) {
        
        res.status(200).json({
            message:"Error fetching todos"
        })
    }
})

// update 

todoRouter.patch("/update/:id", auth , async(req,res)=>{
    const {id} = req.params

    try {
        const updateTodo = await todoModel.findByIdAndUpdate(id,req.body)

        res.status(201).json({
            message:`Todo Updated successfully with id : ${id}`
        })
    } catch (error) {
        res.status(500).send("Error updating the todo, please try again")
    }
})

// delete
todoRouter.delete("/delete/:id", auth , async(req,res)=>{
    const {id} = req.params
    try {
        const deleteTodo = await todoModel.findByIdAndDelete(id)

        res.status(201).json({
            message:`Todo deleted successfully with id : ${id}`
        })
    } catch (error) {
        res.status(500).send("Error deleting the todo, please try again")
    }
})



module.exports = todoRouter;
