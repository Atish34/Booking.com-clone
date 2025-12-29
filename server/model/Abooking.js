const mongoose = require("mongoose")

const airlineSchema = new mongoose.Schema({
    name:{type:String,required:true},
    from:{type:String,required:true},
    to:{type:String,required:true}, 
    departDate:{type:String,required:true}, 
    departTime:{type:String,required:true}, 
    arriveDate:{type:String,required:true}, 
    arriveTime:{type:String,required:true}, 
    number:{type:String,required:true}, 
    amount:{type:String,required:true},
    passengers:{type:String,required:true},
    totalAmount:{type:String,required:true},
    isConfirm:{type:Boolean,default:false},
    isCancel:{type:Boolean,default:false},
    customerId:{type:mongoose.Types.ObjectId,ref:"customer"}
})

module.exports = mongoose.model("abook",airlineSchema)