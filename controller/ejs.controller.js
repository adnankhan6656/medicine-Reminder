const getLoginController=async(req,res)=>{
try {
    res.render("login/Login.ejs")
   
} catch (error) {
    
}
}
const getRegistrationController=async(req,res)=>{
try {
    res.render("registration/Register.ejs")
    
} catch (error) {
    
}
}

module.exports={getLoginController,getRegistrationController}