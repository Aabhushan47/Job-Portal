const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const getUserFromToken = async (token) => {
  if (!token) {
    return res.status(400).json({ error: "User Not Authorized" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
  return await User.findById(decoded.id, "-password");
};

exports.isAuthorized = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    req.user = await getUserFromToken(token);

    next();
  } catch (error) {
    return res.status(400).json({ error: "User Not Authorized" });
  }
};

exports.isEmployer = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const user = await getUserFromToken(token);
    if (user.role !== "employer") {
      return res.status(400).json({ error: "User not an employer" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ error: "User Not Authorized" });
  }
};

exports.isCandidate = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const user = await getUserFromToken(token);
    if (user.role !== "candidate") {
      return res.status(400).json({ error: "User not an candidate" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ error: "User Not Authorized" });
  }
};
