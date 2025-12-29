const { getCustomerProperty, getCustomerAirplane, getCustomerRental, searchCustomerProperty, searchCustomerAirplane, addCustomerAirplaneBook, getCustomerBookingAirplane, updateCustomerCancelAirplane, addCustomerRentalBook, getCustomerBookingRental, updateCustomerCancelRental, addCustomerHotelBook, getCustomerBookingHotel, updateCustomerCancelHotel } = require("../controllers/customer.controlller")
const { customerProtected } = require("../middleware/protect.controller")

const router = require("express").Router()

router
    .get("/get-customer-property",getCustomerProperty)
    .get("/get-customer-airplane",getCustomerAirplane)
    .get("/get-customer-rental",getCustomerRental)
    .get("/customer/stay/search",searchCustomerProperty)
    .get("/customer/airplane/search",searchCustomerAirplane)
    .post("/customer-airplane-book",customerProtected,addCustomerAirplaneBook)
    .post("/customer-rental-book",customerProtected,addCustomerRentalBook)
    .post("/customer-hotel-book",customerProtected,addCustomerHotelBook)
    .get("/get-customer-airplane-book/:customerId",getCustomerBookingAirplane)
    .get("/get-customer-rental-book/:customerId",getCustomerBookingRental)
    .get("/get-customer-hotel-book/:customerId",getCustomerBookingHotel)
    .put("/update-customer-airplane-book/:abid",updateCustomerCancelAirplane)
    .put("/update-customer-rental-book/:rbid",updateCustomerCancelRental)
    .put("/update-customer-hotel-book/:haid",updateCustomerCancelHotel)

module.exports = router