const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
    name:{type:String,required:true},
    ptype:{type:String,required:true},
    address:{type:String,required:true}, 
    license:{type:String,required:true},
    img:{type:[String],required:true},
    room: [{roomType: {type: String},price: {type: String}}],
    isAllow:{type:Boolean,default:false},
    ownerId:{type:mongoose.Types.ObjectId,ref:"owner"}
})

module.exports = mongoose.model("Oproperty",propertySchema)