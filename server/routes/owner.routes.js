const { uploadOwner, getOwnerProperty, deleteOwnerProperty, updateOwnerProperty, addOwnerRoom, deleteRoom, getHotelBook, updateOwnerStatus, deleteHotelBook } = require("../controllers/owner.controller")

const router = require("express").Router()

router
    .post("/owner-property-add",uploadOwner)
    .get("/owner-property-get/:ownerId",getOwnerProperty)
    .delete("/owner-property-delete/:ownerId",deleteOwnerProperty)
    .put("/owner-property-update/:id",updateOwnerProperty)
    .post("/add-owner-room",addOwnerRoom)
    .delete("/room/:propertyId/:roomId", deleteRoom)
    .get("/owner-hotel-get-book/:ownerId",getHotelBook)
    .put("/owner-change-status/:uhid",updateOwnerStatus)
    .delete("/owner-hotel-delete/:uhid",deleteHotelBook)

module.exports = router