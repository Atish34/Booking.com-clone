const mongoose = require("mongoose");

const hBookingSchema = new mongoose.Schema({
    hotelId: {type: mongoose.Schema.Types.ObjectId,ref: "Oproperty",required: true,},
    room: {
        roomType: {type: String,required: true,},
        price: {type: String,required: true,},
        roomId: {type: mongoose.Schema.Types.ObjectId,required: true,},
    },
    fromDate: {type: String,required: true,},
    toDate: {type: String,required: true,},
    hamount: {type: String,required: true,},
    isCancel:{type:Boolean,default:false},
    ownerId:{type:mongoose.Types.ObjectId,ref: "owner",required:true},
    customerId: {type: mongoose.Schema.Types.ObjectId,ref: "customer",required: true,},
    bookingStatus: {type: String,enum: ["pending", "confirmed", "cancelled"],default: "pending",},
  },{ timestamps: true });

module.exports = mongoose.model("Hbooking", hBookingSchema);
