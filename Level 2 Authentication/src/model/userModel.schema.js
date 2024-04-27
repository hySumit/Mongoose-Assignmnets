const {Schema,model} = require('mongoose')

const usersSchema = new Schema({
    username:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String,required:true}
},{versionKey:false})

const modelUser = model("users",usersSchema);

module.exports = modelUser