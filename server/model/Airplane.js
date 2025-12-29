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
})

module.exports = mongoose.model("airplane",airlineSchema)