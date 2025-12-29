const mongoose = require("mongoose")

const ownerSchema = new mongoose.Schema({
    name:{type:String,},
    email:{type:String,},
    avatar:{type:String,},
    isActive:{type:Boolean,default:false}
})

module.exports = mongoose.model("owner",ownerSchema)