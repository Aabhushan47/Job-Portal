const express = require("express");
const router = express.Router();
const { isAuthorized, isEmployer } = require("../middlewares/auth");

const {
  userRegistration,
  userLogin,
  userLogout,
  getUser,
} = require("../controllers/userController");

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.get("/logout", isAuthorized, userLogout);
router.get("/getUser", isAuthorized, getUser);

module.exports = router;
