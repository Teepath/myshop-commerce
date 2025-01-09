const nodemailer = require('nodemailer'); 
const sendVerificationEmail = async (userEmail, tok) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.userGmail,
        pass: process.env.userPass,
      },
    });
  
    const verificationLink = `${process.env.callbackUrl}/checkout?token=${tok}`;
    const mailOptions = {
      from: process.env.userGmail,
      to: userEmail,
      subject: 'Verify your email',
      // html: `<p>Your verification code is <strong>${tosend}</strong> </p>`,
      html: `<p>Please verify your email by clicking the link below:</p><a href="${verificationLink}">Verify Email</a>`,
    };
  
    await transporter.sendMail(mailOptions);
  };

  module.exports = sendVerificationEmail;