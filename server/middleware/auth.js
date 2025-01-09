const jwt = require("jsonwebtoken");
const User = require("../models/User")

const protect = async (req, res, next) => {
 
    // 1. Get the token from the header or cookie
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.access_token;
    console.log(token, 'token')
    
    if (!token) {
      return res.status(401).json({error:'You are not logged in! Please log in to get access.'});
    }
  
    // 2. Verify the token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
     // Attach the user to the request
     req.user = await User.findById(decoded.id); // Fetch the user from the database
     if (!req.user) {
       return res.status(401).json({ message: 'User not found' });
     }
 
     next();  
    
    } catch (error) {
      return next(new Error('Invalid or malformed token!', 401));
    }
};



module.exports = protect;