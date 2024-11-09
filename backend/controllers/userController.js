const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.userRegistration = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const user = await User.create({ name, email, password, role });
    user.password = undefined;
    res
      .status(200)
      .json({ success: true, message: "User Succesfully registered", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error", err });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({ error: "Enter both email and password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Not registered" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Enter correct password" });
    }
    //generate signed token
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRETKEY
    );
    user.token = jwtToken;
    user.password = undefined;
    //optional part
    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      path: "/",
    };
    //store in cookie and send response back
    res
      .status(200)
      .cookie("token", jwtToken, options)
      .json({ success: true, message: "Login Success", jwtToken, user });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
  }
};

exports.userLogout = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      expires: new Date(Date.now()),
    };

    res
      .status(200)
      .clearCookie("token", options)
      .json({ success: true, message: "Logout Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUser = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ error: "No User found" });
  }
  res.status(200).json({ success: true, user });
};
