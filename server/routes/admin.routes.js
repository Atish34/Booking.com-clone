const { getAdminCustomer, updateAdminBlockUnblockCustomer, getAdminOwner, updateAdminBlockUnblockOwner, getAdminListedProperty, updateAdminBlockUnblockProperty, getAdminRental, updateAdminBlockUnblockRental, getAdminVehicles, updateAdminBlockUnblockVehicles, addAdminAirplane, getAdminAirplane, deleteAdminAirplane, updateAdminAirplane, updateAdminAirplaneBook, getAdminAirplaneBook, deleteAdminAirplaneBook, getAdminRentalBook, getAdminHotelBook } = require("../controllers/admin.controller")


const router = require("express").Router()

router
    .get("/get-admin-customer",getAdminCustomer)
    .get("/get-admin-owner",getAdminOwner)
    .put("/update-admin-customer/:cid",updateAdminBlockUnblockCustomer)
    .put("/update-admin-owner/:oid",updateAdminBlockUnblockOwner)
    .put("/update-admin-property/:pid",updateAdminBlockUnblockProperty)
    .put("/update-admin-rental/:rid",updateAdminBlockUnblockRental)
    .put("/update-admin-vehicle/:vid",updateAdminBlockUnblockVehicles)
    .put("/update-admin-airplane-book/:uaid",updateAdminAirplaneBook)
    .get("/get-admin-property",getAdminListedProperty)
    .get("/get-admin-rental",getAdminRental)
    .get("/get-admin-vehicle",getAdminVehicles)
    .post("/add-admin-airplane",addAdminAirplane)
    .get("/get-admin-airplane",getAdminAirplane)
    .get("/get-admin-airplane-book",getAdminAirplaneBook)
    .get("/get-admin-rental-book",getAdminRentalBook)
    .get("/get-admin-hotel-book",getAdminHotelBook)
    .put("/update-admin-airplane/:airplaneId",updateAdminAirplane)
    .delete("/delete-admin-airplane/:aid",deleteAdminAirplane)
    .delete("/delete-admin-airplane-book/:uaid",deleteAdminAirplaneBook)

module.exports = router