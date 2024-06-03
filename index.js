// app.js
const path=require("path");
const express = require('express');
const userRoute=require("./routes/user.route");
const app = express();
const PORT = 3000;
const dotenv=require("dotenv");
dotenv.config();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));

app.get("/",(req,res)=>{
 res.render("index")
})
app.use("/user",userRoute)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
