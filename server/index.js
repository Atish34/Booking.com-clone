const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const cookieparser = require("cookie-parser")
const cors = require("cors")
const { adminProtected, ownerProtected, rentalProtected, customerProtected } = require("./middleware/protect.controller")
require("dotenv").config()
const app = express()
app.use(express.json())
app.use(cookieparser())
app.use(express.static("dist"))
app.use(cors({
    origin:true,
    credentials:true
}))

app.use("/api/auth",require("./routes/auth.routes"))
app.use("/api/admin",adminProtected,require("./routes/admin.routes"))
app.use("/api/owner",ownerProtected,require("./routes/owner.routes"))
app.use("/api/rental",rentalProtected,require("./routes/rental.routes"))
app.use("/api/customer",require("./routes/customer.routes"))

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname,"dist","index.html"))
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open",()=>{
    console.log("db connect");
    app.listen(5000,console.log("server running"))
})