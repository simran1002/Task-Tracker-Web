const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.get("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.isUser = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Employee" ) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};