const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const Owner = require("../model/Owner")
const Rental = require("../model/Rental")
const Customer = require("../model/Customer")

exports.adminProtected = asyncHandler(async(req,res,next)=>{
    const token = req.cookies["admin"]
    if(!token){
        return res.status(401).json({message:"no cookie found"})
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if(err){
            console.log(err);
            return res.status(401).json({message:"invalid token"})
        }
        next()
    })
})

exports.ownerProtected = asyncHandler(async(req,res,next)=>{
    const token = req.cookies["owner"]
    if(!token){
        return res.status(401).json({message:"no cookie found"})
    }
    jwt.verify(token,process.env.JWT_SECRET,async(err,decode)=>{
        if(err){
            console.log(err);
            return res.status(401).json({message:"invalid token"})
        }

        const result = await Owner.findById(decode._id)
        if(!result.isActive){
            return res.status(401).json({message:"account blocked by admin"})
        }

        req.loggedInOwner = decode._id
        next()
    })
})

exports.rentalProtected = asyncHandler(async(req,res,next)=>{
    const token = req.cookies["rental"]
    if(!token){
        return res.status(401).json({message:"no cookie found"})
    }
    jwt.verify(token,process.env.JWT_SECRET,async(err,decode)=>{
        if(err){
            console.log(err);
            return res.status(401).json({message:"invalid token"})
        }

        const result = await Rental.findById(decode._id)
        if(!result.isActive){
            return res.status(401).json({message:"account blocked by admin"})
        }

        req.loggedInRental = decode._id
        next()
    })
})

exports.customerProtected = asyncHandler(async(req,res,next)=>{
    const token = req.cookies["customer"]
    if(!token){
        return res.status(401).json({message:"no cookie found"})
    }
    jwt.verify(token,process.env.JWT_SECRET,async(err,decode)=>{
        if(err){
            console.log(err);
            return res.status(401).json({message:"invalid token"})
        }

        const result = await Customer.findById(decode._id)
        if(!result.isActive){
            return res.status(401).json({message:"account blocked by admin"})
        }
        console.log(result);
        

        req.loggedInCustomer = decode._id
        next()
    })
})