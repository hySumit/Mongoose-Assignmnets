const {Schema,model} = require("mongoose")

const userSchema = new Schema({
    username :{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
},{versionKey:false})

const usermodel = model('users',userSchema);

module.exports = usermodel