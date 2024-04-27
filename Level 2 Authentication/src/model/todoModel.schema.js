const {Schema,model} = require('mongoose')

const todoSchema = new Schema({
    taskname:{type:String,required:true},
    author:{type:String,required:true},
    isCompleted:{type:Boolean,required:true},
    date:{type:Date,default:Date.now},
    userID:{type:String},
    username:{type:String}

},{versionKey:false})

const todoModelSchema = model('todo',todoSchema);

module.exports = todoModelSchema