const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.postSignup = async (req, res) => {
  const { userName, email, password, accountType } = req.body;

  try {
    if (!userName || !email || !password || !accountType ) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    if (!hashedPassword) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }

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

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, user.salt);

    if (hashedPassword !== user.password) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    let payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

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

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide the user id",
      });
    }

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
      message: "User details deleted successfully",
    });
  } catch (error) {}
};