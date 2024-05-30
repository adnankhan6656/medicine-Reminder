const express=require("express");
const { userRegistraion, userLogin, logoutCurrentDevice, logoutAllDevices } = require("../controller/auth.controller");
const router=express.Router();


router.post("/register",userRegistraion);
router.post("/login",userLogin);
router.post("/logout",logoutCurrentDevice);
router.post("/logoutAll",logoutAllDevices);
module.exports=router;