const asyncHandler = require("express-async-handler")
const { checkEmpty } = require("../utils/checkEmpty")
const Rvehicle = require("../model/Rvehicle")
const { default: mongoose } = require("mongoose")
const Rbooking = require("../model/Rbooking")

exports.addRentalVehicle = asyncHandler(async (req, res) => {
   const {name,vtype,number,capacity,ftype} = req.body 
    const { isError, error } = checkEmpty({name,vtype,number,capacity,ftype})
       if (isError) {
         return res.status(400).json({ message: "All fields required", error })
       }
    const result = await Rvehicle.create({name,vtype,number,capacity,ftype,rentalId: req.loggedInRental})
    res.status(200).json({message:"vehicle add success",result})
})

exports.getRentalVehicle = asyncHandler(async(req,res)=>{
    const {rentalId} = req.params
    if (!mongoose.Types.ObjectId.isValid(rentalId)) {
    return res.status(400).json({ message: "Invalid rentalId" })
  }
    const result = await Rvehicle.find({rentalId})
    res.json({message:"property get success",result})
})

exports.updateRentalVehicle = asyncHandler(async(req,res)=>{
    const id = req.params.id
    console.log(id);
    
    const {name,ftype,capacity,number,vtype} = req.body

    const rentalData = {name,ftype,capacity,number,vtype}
    const result = await Rvehicle.findByIdAndUpdate(id,rentalData,{new:true})
    res.json({message:"vehicle update success",result})
    
})

exports.deleteRentalVehicle = asyncHandler(async(req,res)=>{
    await Rvehicle.findByIdAndDelete(req.params.rentalId)
    res.json({message:"delete vehicle success"})
})

exports.getRentalBook = asyncHandler(async(req,res)=>{
  const {rentalId} = req.params
    const result = await Rbooking.find({rentalId})
    .populate({
        path:"customerId",
        select:"name email mobile"
    }) 
    res.status(200).json({message:"property get success",result})
})

exports.updateRentalBook = asyncHandler(async(req,res)=>{
    const {urid} = req.params
    await Rbooking.findByIdAndUpdate(urid,{isConfirm:req.body.isConfirm},{new:true})
    res.json({message:"rental confirm success"})
})

exports.deleteRentalBook = asyncHandler(async(req,res)=>{
    const {urid} = req.params
    await Rbooking.findByIdAndDelete(urid)
    res.json({message:"rental book delete success"})
})

exports.updateRentalAmount = asyncHandler(async(req,res)=>{
    const {raid} = req.params
    await Rbooking.findByIdAndUpdate(raid,{amount:req.body.amount},{new:true})
    res.json({message:"rental amount add success"})
})



  