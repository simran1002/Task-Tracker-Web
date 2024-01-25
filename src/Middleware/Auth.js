const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

// Middleware to check if the request is authenticated
exports.isAuthenticated = async (req, res, next) => {
  try {
    // Retrieve token from cookies, request body, or Authorization header
    const token =
      req.cookies.token ||
      req.body.token ||
      req.get("Authorization").replace("Bearer ", "");

    // Check if a token is present
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    try {
      // Verify and decode the token
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      // Handle invalid token
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Middleware to check if the authenticated user is an Employee
exports.isUser = async (req, res, next) => {
  try {
    // Check if the authenticated user has the "Employee" account type
    if (req.user.accountType !== "Employee") {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
    
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Middleware to check if the authenticated user is an Admin
exports.isAdmin = async (req, res, next) => {
  try {
    // Check if the authenticated user has the "Admin" account type
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
