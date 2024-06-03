const db=require("../models/index.js")
const Medication=db.Medication;
const { generalResponse } = require("../helper/response.helper.js");
const addMedicine=async(req,res)=>{
  try {
    // For Demo purpose
    const user_id=1;
    const {medicineName,description,medicationType}=req.body;
    if(!medicineName ||!description ||!medicationType){
      return generalResponse(res,  { success: false },"All deatails are required")
      
    }
    if(medicationType==='one-time'){
      const {oneTimeDate,oneTimeTime}=req.body;
       if(!oneTimeDate ||!oneTimeTime){
        console.log("Date or Time is missing");
        return generalResponse(res,  { success: false },"Date or time is missing")
       }

      await Medication.create({
        name:medicineName,
        description:description,
        start_date:oneTimeDate,
        time:oneTimeTime,
        recurring:medicationType,
        user_id
      }) 
    }else if(medicationType==='recurring'){
      console.log("no one is selected")
    }
  } catch (error) {
   console.log(error);  
  }

}

module.exports={addMedicine}