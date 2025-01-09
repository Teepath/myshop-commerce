const  bcrypt = require ("bcrypt");
const  jwt= require ("jsonwebtoken");
const  User = require ("../models/User.js");
const nodemailer = require ("nodemailer");
const passwordResetMail = require ("../utils/ResetPasswordEmail.js")
const sendVerificationEmail =require("../utils/SignupMail.js")
const catchAsync = require("../utils/catchAsync.js")
const {createSendToken, signToken}= require("../utils/CreateTokenResponse.js")



/* REGISTER USER */
const register = async (req, res) => {

  try {

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(403).json({ message: "Email already in use"}) 

    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      role
    } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
      phone
    });

    // const token = signToken(newUser._id);
    // newUser.verificationToken = token;
    const generatedToken = Math.random().toString(36).slice(-6);
    newUser.verificationToken = generatedToken;
    await newUser.save({ validateBeforeSave: false });

  
    await sendVerificationEmail(newUser.email, generatedToken)
    .then(() => console.log('Verification email sent'))
    .catch((err) => console.error('Error sending email:', err));
   
    const savedUser =   await newUser.save({ validateBeforeSave: false });
    return res.status(201).json({message: "User saved successfully, email sent for verification code"});
    // return createSendToken(savedUser, 201, res)
  } catch (err) {
    console.log(err, 'err from server')
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log({email, password}, 'login');
//     const user = await User.findOne({ email: email });
//     if (!user) return res.status(400).json({ msg: "User does not exist. " });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     delete user.password;
//     res.status(200).json({ token, user });
//   } catch (err) {
//     if(err.message ==="E11000 duplicate key error collection"){
//       res.status(500).json({ error: "Email already exist" });
//     }
//     res.status(500).json({ error: err.message });
//   }
// };


const login = catchAsync(async(req, res, next) => {
  try{
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({message:'Please provide email and password!'});
  }

  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({message:'Incorrect email or password'});
  }

  // Check if the user has vererified their email
  if (!user.isVerified) {
    return res.status(403).json({message:'Please verify your email to log in.'});
  }

 createSendToken(user, 200, res);
}catch (e) {
  console.log(e);
}
});



const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const token = signToken(user._id);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json({token, data:rest});
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        firstName : req.body. firstName,
        lastName:req.body. lastName,
        email: req.body.email,
        photo:req.body.photo,
        phone: req.body.phoneNo?req.body.phoneNo:'xxx',
        password: hashedPassword,
        passwordConfirm: hashedPassword,
      });

      const myToken = signToken(newUser._id);
      newUser.isVerified = true
    
      await newUser.save({ validateBeforeSave: false });
      // await newUser.save();
      // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', myToken, { httpOnly: true })
        .status(200)
        .json({token:myToken, data:rest});
    }
  } catch (error) {
    next(error);
  }
};




const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};





const reVerifyEmail =async(req, res, next)=>{
  try {
    const { email } = req.query; // Extract email from query parameters
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isVerified = true; // Assuming you have an `isVerified` field in your User schema
    await user.save();

    res.status(200).json({ message: "Email successfully verified!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error verifying email." });
  }

};




const forgotPasswordReset = async(req, res, next)=>{
  try{
    const user = await User.findOne({ email: req.body.email });

    if(!user){
      return  next(new Error('No such user'));
    }

    // const newPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
  
    const newToken =  crypto.randomBytes(32).toString('hex');
    console.log(newToken);
    user.passwordResetToken= newToken;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
   
    console.log(newToken, 'reset token');

    await passwordResetMail(user.email, newToken)
    await user.save({ validateBeforeSave: false });
    res.status(200).json({ message: 'Reset link sent to your email' });

  }catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error resetting password', error });
  }
}



const setNewPassword = async (req, res, next) => {
  try{
    const { token } = req.params;
  const { newPassword } = req.body;

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  // const hashedPassword = bcryptjs.hashSync(newPassword, 10);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

    // Clear reset token fields
    user.passwordResetToken = undefined;
    user.passwordResetExpires= undefined;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ message: 'Password reset successfully' });

}catch (error) {
  console.log(error);
  res.status(500).json({ message: 'Error resetting password', error });
}
};



const updatePassword = async (req, res) => {
  const { email, oldPassword, newPassword, newPasswordConfirm } = req.body;

  console.log(email, oldPassword, newPassword);

  try {
      // Validate input
      if (!email || !oldPassword || !newPassword || !newPasswordConfirm) {
        return res.status(400).json({ message: "All fields are required." });
    }
      if (newPassword !== newPasswordConfirm) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

        // Check if the old password is correct
        const isCorrectPassword = await user.correctPassword(oldPassword, user.password);
        if (!isCorrectPassword) {
            return res.status(401).json({ message: "Old password is incorrect." });
        }
     
      user.password = newPassword; // `pre('save')` hook will hash this password
      user.passwordConfirm = newPasswordConfirm;
      await user.save();
      res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ message: "Internal server error." });
  }
};


const logOutUser = async (req, res) => {
  try{
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  }catch (error) {
    res.status(500).json({error:"sever error"})
  }
}




module.exports ={
  register, login, google,
   signOut, reVerifyEmail,
   forgotPasswordReset, setNewPassword,
   updatePassword,
   logOutUser
}