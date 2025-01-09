const User = require("../models/User")
const {createSendToken}= require("../utils/CreateTokenResponse.js")

const verify = async (req, res) => {
    const token = req.query.token;
    console.log(`verify token: ${token}`);
  
    // Check if token exists
    if (!token) {
      return res.status(400).send({ message: 'Token is required' });
    }
  
    // Decode token and handle possible expiration or invalid format
    let decoded;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).send({ message: 'Invalid token' });
    }
  
    // Check if user is already verified
    if (user.isVerified) {
      return res.status(400).send({ message: 'Email is already verified' });
    }
  
    // Mark the user as verified and clear the verification token
    user.isVerified = true;
    user.verificationToken = null;
    await user.save({ validateBeforeSave: false });
  
    // Send success response
   return  createSendToken(user, 201, res)
    // return res.status(200).send({ message: 'Email verified successfully' });
  };


  module.exports ={verify};
  