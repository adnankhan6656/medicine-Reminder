const db=require("../models/index.js");
const UserSession=db.UserSession;
const verifyToken =async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const user = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user_id = user.user_id;

    const session = await  UserSession.findOne({ where: { session_id:token } });
    if (!session) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
  };
  

module.exports={verifyToken};