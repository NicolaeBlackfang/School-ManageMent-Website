// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify if the user is logged in (has a valid JWT)
const protect = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (Format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token and attach it to the request object (excluding password)
      req.user = await User.findById(decoded.id);

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token found' });
  }
};

// Middleware to restrict access to specific roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Role (${req.user?.role || 'Guest'}) is not authorized to access this resource` 
      });
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };
