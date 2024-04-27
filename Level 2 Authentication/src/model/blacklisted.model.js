const {Schema,model} = require("mongoose")

const blackSchema = new Schema({
    token:{type:String, required:true,unique:true},
    expiresSt : {type:Date, required:true}
},{versionKey:false})

const blackListedToken = model("blacklistedtoken", blackSchema)

module.exports = blackListedToken 
