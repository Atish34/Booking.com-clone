const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,required:true},
    otp:{type:String},
    otpSendOn:{type:Date},
    isActive:{type:Boolean,default:false}
},{timestamps:true})

module.exports = mongoose.model("customer",customerSchema)