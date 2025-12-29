const { addRentalVehicle, getRentalVehicle, deleteRentalVehicle, updateRentalVehicle, getRentalBook, deleteRentalBook, updateRentalBook, updateRentalAmount } = require("../controllers/rental.controller")

const router = require("express").Router()

router
    .post("/rental-vehicle-add",addRentalVehicle)
    .get("/rental-vehicle-get/:rentalId",getRentalVehicle)
    .get("/rental-vehicle-get-book/:rentalId",getRentalBook)
    .put("/rental-vehicle-update/:id",updateRentalVehicle)
    .delete("/rental-vehicle-delete/:rentalId",deleteRentalVehicle)
    .put("/update-rental-vehicle-book/:urid",updateRentalBook)
    .delete("/delete-rental-vehicle-book/:urid",deleteRentalBook)
    .put("/update-rental-amount/:raid",updateRentalAmount)

module.exports = router