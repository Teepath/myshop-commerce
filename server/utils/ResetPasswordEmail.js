const nodemailer = require('nodemailer'); 
const passwordResetMail = async (userEmail, tosend) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.userGmail,
        pass: process.env.userPass,
      },
    });
  
    // const verificationLink = `${process.env.BASE_URL}/verify-email`;
    const mailOptions = {
      from: process.env.userGmail,
      to: userEmail,
      subject: 'Password Reset',
      html: `You requested a password reset. Click the link to reset your password:<a href='${process.env.callbackUrl}/${tosend}' target='_blanks'>reset</a>`,

    };
  
    await transporter.sendMail(mailOptions);
  };

  module.exports = passwordResetMail;