// app.js
const path=require("path");
const express = require('express');
const app=express();
const userRoute=require("./routes/user.route");
const medicationRoute=require("./routes/medication.route");
const cookieParser = require('cookie-parser')
const {scheduleMedication}=require("./scheduler/scheduleMedication");
const {verifyToken}=require("./middleware/verifyToken.js")
const PORT = 3000;
const dotenv=require("dotenv");
const bodyParser=require("body-parser");
dotenv.config();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")));


scheduleMedication();

app.get("/",verifyToken,(req,res)=>{
 res.render("index")
})
app.use("/user",userRoute);
app.use("/medication",medicationRoute);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
