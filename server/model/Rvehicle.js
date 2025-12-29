const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
    name:{type:String,required:true},
    vtype:{type:String,required:true},
    number:{type:String,required:true}, 
    capacity:{type:String,required:true},
    ftype:{type:String,required:true},
    rentalId:{type:mongoose.Types.ObjectId,ref:"rental"},
    isAllow:{type:Boolean,default:false},
})

module.exports = mongoose.model("Rvehicle",propertySchema)