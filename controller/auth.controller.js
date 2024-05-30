const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const db=require("../models/index.js");
const { where } = require("sequelize");
const User=db.User;
const UserSession=db.UserSession;
const userRegistraion=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const isuserExist=await  User.findOne({
             where:{
                 email
             }
          });
          if(isuserExist){
            return res.json(400).json({message:"Email Already exist"});
          }
          const saltRounds=10;
          const hashPassword=await bcrypt.hash(password,saltRounds);
          const user=await User.create({
              name,email,password:hashPassword
             });
             const {password:pass, ...rest } = user.get({plain:true});
          return res.status(201).json({
       rest
          })
        
    } catch (error) {
        
    }
}

const userLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const isValidUser=await User.findOne({
            where:{
                email
            }
        });
        if(!isValidUser){
            return res.status(400).json({message:"Please Sign Up"})
        }
        const validPassword = await bcrypt.compare(password, isValidUser.password);
       if(!validPassword){
   return res.json({message:"Your password is wrong"})
       }
     const token=await jwt.sign({id:isValidUser.id},process.env.JWT_SECRET_KEY);
       const {password:pass, ...rest } = isValidUser.get({plain:true});
    const di=await UserSession.create({ user_id: isValidUser.id,session_id:token});
      return  res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
    } catch (error) {
        
    }
}

// Logout from current device
const logoutCurrentDevice=async(req,res)=>{
    try {
        const token=req.access_token;
        console.log(user)
        await UserSession.destroy({
            where:{
                user_id:req.user_id,
               session_id:token
            }
        })
        
    } catch (error) {
    }
}
const logoutAllDevices=async(req,res)=>{
    try {
        UserSession.destroy({
            where:{
                user_id:req.user_id,
            }
        })
    } catch (error) {
        
    }
}
module.exports={userRegistraion,userLogin,logoutCurrentDevice,logoutAllDevices};