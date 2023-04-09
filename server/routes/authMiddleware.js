const User = require("../models/users.model")
const jwt = require("jsonwebtoken")

const authMiddleware = (requiredRole) => {
    return async (req, res, next) => {
      try {
        
        const token = req.headers['x-access-token']
        if (token === "null" || token === null) {
          return res.json({ status: "error", message: "empty_token" });
        }
        const decodedToken = jwt.verify(token, "ajadfjk242");
        const userID = decodedToken.userID;
        const user = await User.findById(userID);
  
        if (!user) {
          return res.json({ status: "error", message: "not_user" });
        }
  
        // Check if user has required role
        if (user.role !== requiredRole) {
          return res.json({ status:"error", message: "unauthorized" });
        }
  
        // User is authenticated and has required role
        next();
      } catch (error) {
        return res.json({ status:"error", message: "verify_unsucessful" });
      }
    };
  };
  
module.exports = authMiddleware;