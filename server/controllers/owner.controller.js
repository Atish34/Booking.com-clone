const asyncHandler = require("express-async-handler")
const { propertyUpload } = require("../utils/upload")
const { checkEmpty } = require("../utils/checkEmpty")
const  cloudinary  = require("../utils/cloudinary")
const Oproperty = require("../model/Oproperty")
const { default: mongoose } = require("mongoose")
const { getPublicId } = require("../utils/delete")
const Hbooking = require("../model/Hbooking")

exports.uploadOwner = asyncHandler(async (req, res) => {
  propertyUpload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "Multer error", err })
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Images are required" })
    }

    const { name, ptype, address } = req.body
    const { isError, error } = checkEmpty({ name, ptype, address })
    if (isError) {
      return res.status(400).json({ message: "All fields required", error })
    }

    // 1️⃣ Upload license (single image)
    let licenseUrl = ""
    if (req.files.license && req.files.license[0]) {
      const licenseUpload = await cloudinary.uploader.upload(req.files.license[0].path)
      licenseUrl = licenseUpload.secure_url
    }

    // 2️⃣ Upload property images (multiple)
    let imgUrls = []
    if (req.files.img && req.files.img.length > 0) {
      for (const file of req.files.img) {
        const upload = await cloudinary.uploader.upload(file.path)
        imgUrls.push(upload.secure_url)
      }
    }

    // 3️⃣ Create property
    const result = await Oproperty.create({
      ...req.body,
      license: licenseUrl,  // single
      img: imgUrls,         // array of multiple images
      ownerId: req.loggedInOwner
    })

    res.json({ message: "Property added successfully", result })
  })
})


exports.getOwnerProperty = asyncHandler(async(req,res)=>{
    const {ownerId} = req.params
    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
    return res.status(400).json({ message: "Invalid ownerId" })
  }
    const result = await Oproperty.find({ownerId})
    res.json({message:"property get success",result})
})

exports.updateOwnerProperty = asyncHandler(async (req, res) => {
  propertyUpload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    const propertyId = req.params.id;
    const { name, ptype, address } = req.body;

    // Upload license to Cloudinary if new file
    let licenseUrl;
    if (req.files?.license?.[0]) {
      const file = req.files.license[0];
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "property/license",
      });
      licenseUrl = result.secure_url;
    }

    // Upload property images
    let imgUrls = [];
    if (req.files?.img?.length) {
      for (const file of req.files.img) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "property/images",
        });
        imgUrls.push(result.secure_url);
      }
    }

    // Prepare update object
    const updateData = { name, ptype, address };
    if (licenseUrl) updateData.license = licenseUrl;
    if (imgUrls.length > 0) updateData.img = imgUrls;

    // Update in DB
    const updated = await Oproperty.findByIdAndUpdate(propertyId, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Property not found" });

    res.json({ message: "Property updated successfully", property: updated });
  });
});


exports.deleteOwnerProperty = asyncHandler(async(req,res)=>{
  const result = await Oproperty.findById(req.params.ownerId)
  
  if(result.license){
    const license = getPublicId(result.license)
    await cloudinary.uploader.destroy(license)
  }
  if(result.img && result.img.length > 0){
  for (const item of result.img) {
    const img = getPublicId(item)
    await cloudinary.uploader.destroy(img)
  }
 }
  await Oproperty.findByIdAndDelete(req.params.ownerId)
  res.json({message:"delete property success"})
})

exports.addOwnerRoom = asyncHandler(async(req,res)=>{
    const { _id, roomType, price } = req.body

    if (!_id || !roomType || !price) {
      return res.status(400).json({ message: "All fields required" })
    }

    const property = await Oproperty.findById(_id)
    if (!property) {
      return res.status(404).json({ message: "Property not found" })
    }

    property.room.push({ roomType, price })
    await property.save()

    res.status(201).json({
      message: "Room added successfully",
      room: property.room
    })
})

exports.deleteRoom = async (req, res) => {
  const { propertyId, roomId } = req.params;

  const property = await Oproperty.findByIdAndUpdate(
    propertyId,
    {
      $pull: { room: { _id: roomId } }
    },
    { new: true }
  );

  if (!property) {
    return res.status(404).json({ message: "Property not found" });
  }

  res.json({
    message: "Room deleted successfully",
    result: property,
  });
};

exports.getHotelBook = asyncHandler(async(req,res)=>{
  const {ownerId} = req.params
    const result = await Hbooking.find({ownerId})
    .populate({
        path:"customerId",
        select:"name email mobile"
    })
    .populate({
    path:"hotelId",
    select:"name ptype address"
  }) 
    res.status(200).json({message:"property get success",result})
})

exports.updateOwnerStatus = asyncHandler(async (req, res) => {
  const {uhid} = req.params
  const {bookingStatus} = req.body
  await Hbooking.findByIdAndUpdate(uhid,{bookingStatus},{new:true})
  res.json({ meassage: "update status success" })
})

exports.deleteHotelBook = asyncHandler(async(req,res)=>{
    const {uhid} = req.params
    await Hbooking.findByIdAndDelete(uhid)
    res.json({message:"hotel book delete success"})
})