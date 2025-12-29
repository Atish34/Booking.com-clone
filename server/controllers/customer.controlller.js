const asyncHandler = require("express-async-handler")
const Airplane = require("../model/Airplane")
const Oproperty = require("../model/Oproperty")
const Rvehicle = require("../model/Rvehicle")
const Abooking = require("../model/Abooking")
const Rbooking = require("../model/Rbooking")
const Hbooking = require("../model/Hbooking")

exports.getCustomerProperty = asyncHandler(async(req,res)=>{
    const result = await Oproperty.find({isAllow:true})
    res.json({message:"property get success",result})
})

exports.searchCustomerProperty = asyncHandler(async (req, res) => {
  const { destination, keyword,date } = req.query;
  let filter = { isAllow: true };
  if (destination) {
    filter.address = { $regex: destination, $options: "i" };
  }

  if (keyword) {
    filter.ptype = { $regex: keyword, $options: "i" }
  }
  const result = await Oproperty.find(filter);
  res.json({
    message: "property search success",
    result,
  });
});


exports.getCustomerAirplane = asyncHandler(async(req,res)=>{
    const result = await Airplane.find()
    res.json({message:"airplane get success",result})
})

exports.searchCustomerAirplane = asyncHandler(async (req, res) => {
  const { destination, keyword, date,date2 } = req.query;

  let filter = {}

  if (destination) {
    filter.from = { $regex: destination, $options: "i" };
  }

  if (keyword) {
    filter.to = { $regex: keyword, $options: "i" }
  }

  if (date) {
    filter.departDate = { $regex: date, $options: "i" };
  }

  if (date2) {
    filter.arriveDate = { $regex: date2, $options: "i" }
  }

  const result = await Airplane.find(filter);
  console.log(result);
  
  res.json({
    message: "property search success",
    result,
  });
});

exports.getCustomerRental = asyncHandler(async(req,res)=>{
    const result = await Rvehicle.find()
    res.json({message:"rental get success",result})
})

exports.addCustomerAirplaneBook = asyncHandler(async (req, res) => {
  const { flightId, passengers, bamount, editData } = req.body;
  console.log(req.loggedInCustomer);
  

  const result = await Abooking.create({
    flightId,
    passengers,
    totalAmount: bamount,

    name: editData.name,
    from: editData.from,
    to: editData.to,
    departDate: editData.departDate,
    departTime: editData.departTime,
    arriveDate: editData.arriveDate,
    arriveTime: editData.arriveTime,
    number: editData.number,
    amount: editData.amount,
    customerId: req.loggedInCustomer
  });

  res.status(200).json({
    message: "airplane book success",
    result,
  });
});

exports.getCustomerBookingAirplane = asyncHandler(async(req,res)=>{
  const {customerId} = req.params
  const result = await Abooking.find({customerId})
  res.json({message:"airplane booking get success",result})
})

exports.updateCustomerCancelAirplane = asyncHandler(async(req,res)=>{
    const {abid} = req.params
    await Abooking.findByIdAndUpdate(abid,{isCancel:req.body.isCancel},{new:true})
    res.json({message:"ticket cancel success"})
})
exports.getCustomerBookingRental = asyncHandler(async(req,res)=>{
  const {customerId} = req.params
  const result = await Rbooking.find({customerId})
  .populate({
     path:"rentalId",
      select:"name email mobile"
  })
  res.json({message:"rental booking get success",result})
})

exports.updateCustomerCancelRental = asyncHandler(async(req,res)=>{
    const {rbid} = req.params
    await Rbooking.findByIdAndUpdate(rbid,{isCancel:req.body.isCancel},{new:true})
    res.json({message:"rental cancel success"})
})

exports.addCustomerRentalBook = asyncHandler(async (req, res) => {

  const { vehicleId, pickup,pickupTime,drop, dropTime,passanger,vehicle } = req.body;
  

  const result = await Rbooking.create({
    vehicleId,
    pickup,
    pickupTime,
    drop,
    dropTime,
    passanger,

    name: vehicle.name,
    vtype: vehicle.vtype,
    number: vehicle.number,
    capacity: vehicle.capacity,
    ftype: vehicle.ftype,
    rentalId: vehicle.rentalId,
    customerId: req.loggedInCustomer
  });

  res.status(200).json({
    message: "rental book success",
    result,
  });
});

exports.addCustomerHotelBook = asyncHandler(async (req, res) => {
  const {hotelId,hotel,room,fromDate,toDate,hamount} = req.body;
  

  const booking = await Hbooking.create({
    hotelId,
    room: {
      roomType: room.roomType,
      price: room.price,
      roomId: room._id,
    },
    fromDate,
    toDate,
    hamount,
    ownerId:hotel?.ownerId,
    customerId:req.loggedInCustomer,
  });
 
  res.status(201).json({
    message: "Hotel booked successfully",
    booking,
  });
});

exports.getCustomerBookingHotel = asyncHandler(async(req,res)=>{
  const {customerId} = req.params
  const result = await Hbooking.find({customerId})
  .populate({
     path:"ownerId",
      select:"name email mobile"
  })
  .populate({
    path:"hotelId",
    select:"name ptype address"
  })
  res.json({message:"hotel booking get success",result})
})

exports.updateCustomerCancelHotel = asyncHandler(async(req,res)=>{
    const {haid} = req.params
    await Hbooking.findByIdAndUpdate(haid,{isCancel:req.body.isCancel},{new:true})
    res.json({message:"hotel cancel success"})
})
