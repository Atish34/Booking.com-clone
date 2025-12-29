const { Router } = require("express")
const {loginAdmin,logoutAdmin,registerAdmin, registerCustomer, loginCustomer, verifyCustomerOtp, logoutCustomer, continueWithGoogle, logoutOwner, registerRental, loginRental, logoutRental} = require("../controllers/auth.controller")
const route = require("express").Router()

route
    .post("/admin/register",registerAdmin)
    .post("/admin/login",loginAdmin)
    .post("/admin/logout",logoutAdmin)
    
    .post("/customer/register",registerCustomer)
    .post("/customer/login",loginCustomer)
    .post("/customer/verifyOtp",verifyCustomerOtp)
    .post("/customer/logout",logoutCustomer)
    
    .post("/continuewithgoogle",continueWithGoogle)
    .post("/ownerlogout",logoutOwner)

    .post("/rental/register",registerRental)
    .post("/rental/login",loginRental)
    .post("/rental/logout",logoutRental)

module.exports = route