const asynchandler = require("express-async-handler")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Admin = require("../model/Admin")
const Customer = require("../model/Customer")
const { generateOtp } = require("../utils/otp")
const { sendEmail } = require("../utils/email")
const { differenceInSeconds } = require("date-fns")
const { OAuth2Client } = require("google-auth-library")
const Owner = require("../model/Owner")
const Rental = require("../model/Rental")

exports.registerAdmin = asynchandler(async(req,res) =>{
    const {email,password} = req.body
    if(validator.isEmpty(email) || validator.isEmpty(password)){
        return res.status(400).json("all fields required")
    }
    if(validator.isEmail(email)){
        return res.status(400).json({message : "invalid credential"})
    }
    const result = await Admin.findOne({email})
    if(result){
        return res.status(409).json({message : "email is alredy exist"})
    }
    const hashpassword = await bcrypt.hash(password,10)
    await Admin.create({...req.body,password : hashpassword})
    res.json({message : "admin register success"})
})

exports.loginAdmin = asynchandler(async(req,res) =>{
    const {email,password} = req.body

    const result = await Admin.findOne({email})
    if(!result){
       return res.status(400).json({message : "invalid credential"})
    }

    const isVerify = await bcrypt.compare(password,result.password)
    if(!isVerify){
       return res.status(401).json({message : "password is incorrect"})
    }
     
    const token =  jwt.sign({_id:result._id},process.env.JWT_SECRET,{expiresIn:"365d"})
     
    res.cookie("admin",token,{
        maxAge : 1000 * 60 * 60 * 24 * 365,
        httpOnly : true,
        secure: process.env.NODE_ENV === "production"
    })

    res.json({
        message:"admin login success",
        result: {
            _id : result._id,
            name : result.name,
            email : result.email,
        }
    })
})

exports.logoutAdmin = asynchandler(async(req,res) => {
    res.clearCookie("admin")
    res.json({message:"admin logout success"})
})

exports.registerCustomer = asynchandler(async(req,res) => {
    const {name,email,mobile} = req.body
    const result = await Customer.findOne({$or:[{email},{mobile}]})
    
    if(result){
        return res.status(409).json({message:"email or mobile is alredy exist"})
    }

    await Customer.create(req.body)
    res.json({message:"customer register success"})
})

exports.loginCustomer = asynchandler(async(req,res)=>{
    const {userName} = req.body
    
    const result = await Customer.findOne({$or:[{email:userName},{mobile:userName}]})
    if(!result){
        return res.status(400).json({message:"invalid credentials"})
    }
    
    const otp = generateOtp()
    await Customer.findByIdAndUpdate(result._id,{otp,otpSendOn:Date.now()})
    
    await sendEmail({
        message:`<h1>Your otp is ${otp}</h1>`,
        subject:"verify otp to login",
        to:result.email
    })
    res.json({message:"otp send"})
})

exports.verifyCustomerOtp = asynchandler(async(req,res)=>{
    const {otp,userName} = req.body
    const result = await Customer.findOne({$or:[{email:userName},{mobile:userName}]})
    if(!result){
        return res.status(401).json({message:"invalid credentials"})
    }
    if(result.otp !== otp){
        return res.status(401).json({message:"invalid otp"})
    }
    if(differenceInSeconds(Date.now(),result.otpSendOn) > process.env.OTP_EXPIRE){
        await Customer.findByIdAndUpdate(result._id,{otp:null})
        return res.status(401).json({message:"otp expire"})
    }

    await Customer.findByIdAndUpdate(result._id,{otp:null})
    const token = jwt.sign({_id:result._id},process.env.JWT_SECRET,{expiresIn:"365d"})
    
    res.cookie("customer",token,{
        maxAge: 1000 * 60 * 60 * 24 *365,
        httpOnly:true,
        secure:process.env.NODE_ENV === "production"
    })
    
    res.json({
        message:"login success",
        result:{ 
            name:result.name,
            mobile:result.mobile,
            email:result.email,
            customer:result._id
        }
    })
})

exports.logoutCustomer = asynchandler(async(req,res)=>{
    res.clearCookie("customer")
    res.json({message:"customer logout success"})
})

exports.continueWithGoogle = asynchandler(async (req, res) => {
    try {
        console.log("Received credential:", req.body.credential);

        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        
        const payload = ticket.getPayload();
        const { picture, name, email } = payload;

        let result = await Owner.findOne({ email });
        
        if (result) {
            const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET);
            res.cookie("owner", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
            return res.json({ message: "login success", result });
        }

        // Create new user
        const newUser = await Owner.create({ name, email, avatar: picture });
        
        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
        res.cookie("owner", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
        
        res.json({ message: "register success", result: newUser });

    } catch (error) {
        console.log("GOOGLE LOGIN ERROR:", error);
        res.status(401).json({ message: "unable to login" });
    }
});


exports.logoutOwner = asynchandler(async(req,res)=>{
    res.clearCookie("owner")
    res.json({message:"owner logout success"})
})

exports.registerRental = asynchandler(async(req,res) =>{
    const {email,mobile,password} = req.body
    
    if(validator.isEmpty(email) || validator.isEmpty(password)){
        return res.status(400).json("all fields required")
    }
    // if(validator.isEmail(email)){
    //     return res.status(400).json({message : "invalid credential"})
    // }
    const result = await Rental.findOne({email})
    if(result){
        return res.status(409).json({message : "email is alredy exist"})
    }
    const hashpassword = await bcrypt.hash(password,10)
    await Rental.create({...req.body,password : hashpassword})
    res.json({message : "admin register success"})
})

exports.loginRental = asynchandler(async(req,res) =>{
    const {email,password} = req.body

    const result = await Rental.findOne({email})
    if(!result){
       return res.status(400).json({message : "invalid credential"})
    }

    const isVerify = await bcrypt.compare(password,result.password)
    if(!isVerify){
       return res.status(401).json({message : "password is incorrect"})
    }
     
    const token =  jwt.sign({_id:result._id},process.env.JWT_SECRET,{expiresIn:"365d"})
     
    res.cookie("rental",token,{
        maxAge : 1000 * 60 * 60 * 24 * 365,
        httpOnly : true,
        secure: process.env.NODE_ENV === "production"
    })

    res.json({
        message:"rental login success",
        result: {
            _id : result._id,
            name : result.name,
            email : result.email,
            mobile : result.mobile,
        }
    })
})

exports.logoutRental = asynchandler(async(req,res) => {
    res.clearCookie("rental")
    res.json({message:"rental logout success"})
})