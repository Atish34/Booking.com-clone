const asyncHandler = require("express-async-handler")
const Customer = require("../model/Customer")
const Owner = require("../model/Owner")
const Oproperty = require("../model/Oproperty")
const Rental = require("../model/Rental")
const { default: mongoose } = require("mongoose")
const Rvehicle = require("../model/Rvehicle")
const Airplane = require("../model/Airplane")
const { checkEmpty } = require("../utils/checkEmpty")
const Abooking = require("../model/Abooking")
const Rbooking = require("../model/Rbooking")
const Hbooking = require("../model/Hbooking")

exports.getAdminCustomer = asyncHandler(async(req,res)=>{
    const result = await Customer.find()
    res.json({message:"customer get success",result})
})

exports.getAdminOwner = asyncHandler(async(req,res)=>{
    const result = await Owner.find()
    res.json({message:"customer get success",result})
})
exports.getAdminRental = asyncHandler(async(req,res)=>{
    const result = await Rental.find()
    res.json({message:"rental get success",result})
})

exports.updateAdminBlockUnblockCustomer = asyncHandler(async(req,res)=>{
    const {cid} = req.params
    await Customer.findByIdAndUpdate(cid,{isActive:req.body.isActive},{new:true})
    res.json({message:"customer block success"})
})

exports.updateAdminBlockUnblockOwner = asyncHandler(async(req,res)=>{
    const {oid} = req.params
    await Owner.findByIdAndUpdate(oid,{isActive:req.body.isActive},{new:true})
    res.json({message:"owner block success"})
})

exports.getAdminListedProperty = asyncHandler(async(req,res)=>{
    const result = await Oproperty.find()
    .populate({
        path:"ownerId",
        select:"name email"
    }) 
    res.status(200).json({message:"property get success",result})
})

exports.getAdminVehicles = asyncHandler(async(req,res)=>{
    const result = await Rvehicle.find()
    .populate({
        path:"rentalId",
        select:"name email"
    }) 
    res.status(200).json({message:"vehicle get success",result})
})

exports.updateAdminBlockUnblockProperty = asyncHandler(async(req,res)=>{
    const {pid} = req.params
    await Oproperty.findByIdAndUpdate(pid,{isAllow:req.body.isAllow},{new:true})
    res.json({message:"property block success"})
})

exports.updateAdminBlockUnblockVehicles = asyncHandler(async(req,res)=>{
    const {vid} = req.params
    await Rvehicle.findByIdAndUpdate(vid,{isAllow:req.body.isAllow},{new:true})
    res.json({message:"vehicle block success"})
})

exports.updateAdminBlockUnblockRental = asyncHandler(async(req,res)=>{
    const {rid} = req.params
    await Rental.findByIdAndUpdate(rid,{isActive:req.body.isActive},{new:true})
    res.json({message:"rental block success"})
})

exports.addAdminAirplane = asyncHandler(async(req,res)=>{
    const data = req.body
     const { isError, error } = checkEmpty(data)
           if (isError) {
             return res.status(400).json({ message: "All fields required", error })
           }
    const result = await Airplane.create(data)
    res.status(200).json({message:"airplane create success",result})
    
})

exports.getAdminAirplane = asyncHandler(async(req,res)=>{
    const result = await Airplane.find()
    res.json({message:"airplna get success",result})
})

exports.updateAdminAirplane = asyncHandler(async(req,res)=>{
    const id = req.params.airplaneId
    const data = req.body
    await Airplane.findByIdAndUpdate(id,data,{new:true})
    res.json({message:"airplna update success"})
})

exports.deleteAdminAirplane = asyncHandler(async(req,res)=>{
    const {aid} = req.params
    await Airplane.findByIdAndDelete(aid)
    res.json({message:"airplna delete success"})
})

exports.getAdminAirplaneBook = asyncHandler(async(req,res)=>{
    const result = await Abooking.find()
    .populate({
        path:"customerId",
        select:"name email mobile"
    }) 
    res.status(200).json({message:"property get success",result})
})

exports.updateAdminAirplaneBook = asyncHandler(async(req,res)=>{
    const {uaid} = req.params
    await Abooking.findByIdAndUpdate(uaid,{isConfirm:req.body.isConfirm},{new:true})
    res.json({message:"airplane confirm success"})
})

exports.deleteAdminAirplaneBook = asyncHandler(async(req,res)=>{
    const {uaid} = req.params
    await Abooking.findByIdAndDelete(uaid)
    res.json({message:"airplane book delete success"})
})

exports.getAdminRentalBook = asyncHandler(async(req,res)=>{
    const result = await Rbooking.find()
    .populate({
        path:"customerId",
        select:"name email mobile"
    })
    .populate({
        path:"rentalId",
        select:"name email mobile"
    })
    res.json({message:"rental get success",result})
})

exports.getAdminHotelBook = asyncHandler(async(req,res)=>{
    const result = await Hbooking.find()
    .populate({
        path:"customerId",
        select:"name email mobile"
    })
    .populate({
        path:"ownerId",
        select:"name email mobile"
    })
    .populate({
        path:"hotelId",
        select:"name ptype address"
    })
    res.json({message:"hotel get success",result})
})