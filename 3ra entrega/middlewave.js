// middleware/authorizationMiddleware.js
const authorizationMiddleware = (requiredRole) => (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === requiredRole) {
      return next();
    } else {
      res.status(403).json({ message: 'Acceso no autorizado' });
    }
  };
  
  module.exports = authorizationMiddleware;
  