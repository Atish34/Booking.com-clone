const mongoose = require("mongoose")

const rentalSchema = new mongoose.Schema({
    name:{type:String,required:true},
    vtype:{type:String,required:true},
    number:{type:String,required:true}, 
    capacity:{type:String,required:true},
    ftype:{type:String,required:true},
    drop:{type:String,required:true},
    dropTime:{type:String,required:true},
    pickup:{type:String,required:true},
    pickupTime:{type:String,required:true},
    amount:{type:String},
    passanger:{type:String,required:true},
    isConfirm:{type:Boolean,default:false},
    isCancel:{type:Boolean,default:false},
    rentalId:{type:mongoose.Types.ObjectId,ref:"rental",required:true},
    customerId:{type:mongoose.Types.ObjectId,ref:"customer"},
})

module.exports = mongoose.model("rbook",rentalSchema)