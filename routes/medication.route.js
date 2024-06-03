const express=require("express");
const { addMedicine } = require("../controller/medication.controller");
const router=express.Router();

router.post("/add-medication",addMedicine)



module.exports=router;