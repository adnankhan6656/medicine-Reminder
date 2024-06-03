const express=require("express");
const { userRegistraion, userLogin, logoutCurrentDevice, logoutAllDevices } = require("../controller/auth.controller");
const { getRegistrationController, getLoginController } = require("../controller/ejs.controller");
const {verifyToken}=require("../middleware/verifyToken.js")
const router=express.Router();

router.get("/register",getRegistrationController);
router.post("/register",userRegistraion);
router.get("/login",getLoginController)
router.post("/login",userLogin);
router.get("/logout",verifyToken,logoutCurrentDevice);
router.get("/logoutAll",verifyToken,logoutAllDevices);
module.exports=router;