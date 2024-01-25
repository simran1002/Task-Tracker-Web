const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// User registration (signup) endpoint
exports.postSignup = async (req, res) => {
  const { userName, email, password, accountType } = req.body;

  try {
    // Check if all required fields are provided
    if (!userName || !email || !password || !accountType) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    // Check if the user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await User.create({
      userName: userName,
      email: email,
      salt: salt,
      password: hashedPassword,
      accountType: accountType
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// User login endpoint
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if all required fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Compare hashed password
    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword !== user.password) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    let payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Set the token as a cookie with expiration
    let option = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("token", token, option).status(200).json({
      success: true,
      token,
      user,
      message: "Logged in Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// User deletion endpoint
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    // Check if user ID is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide the User id",
      });
    }

    // Find and delete the user
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    await User.findByIdAndDelete(id);
    
    return res.status(200).json({
      success: true,
      message: "User details are deleted Successfully",
    });
  } catch (error) {
    // Handle error
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
