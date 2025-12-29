const mongoose = require("mongoose")

const rentalSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,required:true},
    password:{type:String,required:true},
    isActive:{type:Boolean,default:false}
},{timestamps:true})

module.exports = mongoose.model("rental",rentalSchema)