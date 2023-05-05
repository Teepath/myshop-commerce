const  bcrypt = require ("bcrypt");
const  User = require ("../models/User");
const nodemailer = require('nodemailer')

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    console.log(email, 'em')

  // Generate a reset token
  const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

  // Update the user's reset token and expiration in the database
  const options = { maxTimeMS: 30000 };
  const user = await User.findOneAndUpdate({ email }, { resetToken, resetTokenExpiration }, options);

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }
  
    // Send the password reset email to the user

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,// <= Add this
    secure:true,
    auth: {
      user: process.env.userGmail,
      pass: process.env.userPass
    }
  });


  const mailOptions = {
    from: `${process.env.userGmail}`,
    to: email,
    subject: 'Password Reset Request',
    text: `You are receiving this email because you (or someone else) has requested a password reset for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${process.env.url}/reset-password/${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
  };


  const info = await transporter.sendMail( {
    from: `${process.env.userGmail}`,
    to: email,
    subject: 'Password Reset Request',
    text: `You are receiving this email because you (or someone else) has requested a password reset for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${process.env.url}/reset-password/${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
  })

  console.log(info.messageId)

  res.status(200).send({ message: 'Password reset email sent' });

//  transporter.sendMail( {
//     from: `${process.env.userGmail}`,
//     to: email,
//     subject: 'Password Reset Request',
//     text: `You are receiving this email because you (or someone else) has requested a password reset for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${process.env.url}/reset-password/${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
//   }, (err) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send({ message: 'Failed to send password reset email' });
//     } else {
    
//       res.status(200).send({ message: 'Password reset email sent' });
//     }
//   });

  
}


const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    // Find the user with the specified reset token
    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });
  
    if (!user) {
      return res.status(401).send({ message: 'Invalid or expired reset token' });
    }
  
    // Update the user's password and reset token in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save();
  
    res.status(200).send({ message: 'Password reset successful' });
  };



  module.exports ={
    forgotPassword,
    resetPassword
  }




  