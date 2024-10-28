const express = require("express");
const { isCandidate, isEmployer } = require("../middlewares/auth");
const {
  getCandidateApplications,
  getEmployerApplications,
  postApplication,
} = require("../controllers/applicationController");
const upload = require("../utils/fileUpload");
const router = express.Router();

router.get("/candidate/application", isCandidate, getCandidateApplications);
router.get("/employer/application", isEmployer, getEmployerApplications);
router.post(
  "/candidate/postapplication",
  upload.single("file"),
  isCandidate,
  postApplication
);

module.exports = router;
