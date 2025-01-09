const restrictTo = (...roles) => {
  return (req, res, next) => {
    // Ensure `req.user` exists and has a `role` property
    if (!req.user || !roles.includes(req.user.role)) {
      console.log(`User role: ${req.user ? req.user.role : 'undefined'}, Access denied to route ${req.path}`);
      return res.status(403).json({ 
        status: "fail", 
        message: "Access denied. You do not have permission to perform this action." 
      });
    }

    next();
  };
};

module.exports = restrictTo;



