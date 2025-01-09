const  jwt= require ("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h"});
};




const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookiesOptions = {
      expires: new Date(
        Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
  
    };
    console.log('Token:', token);
    console.log('Cookie Expires:', cookiesOptions.expires);
    
    if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true;
    res.cookie('access_token', token, cookiesOptions);
    
    // Remove password from output
    user.password = undefined;
    
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
    };

    module.exports ={createSendToken, signToken}