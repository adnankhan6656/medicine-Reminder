const express=require("express");
const { userRegistraion, userLogin, logoutCurrentDevice, logoutAllDevices } = require("../controller/auth.controller");
const { getRegistrationController, getLoginController } = require("../controller/ejs.controller");
const router=express.Router();

router.get("/register",getRegistrationController);
router.post("/register",userRegistraion);
router.get("/login",getLoginController)
router.post("/login",userLogin);
router.post("/logout",logoutCurrentDevice);
router.post("/logoutAll",logoutAllDevices);
module.exports=router;