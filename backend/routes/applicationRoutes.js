const express = require("express");
const { isCandidate, isEmployer } = require("../middlewares/auth");
const {
  getCandidateApplications,
  getEmployerApplications,
  postApplication,
  deleteApplication,
  updateStatus,
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
router.put("/updatestatus/:id", isEmployer, updateStatus);
router.delete(
  "/candidate/deleteapplication/:id",
  isCandidate,
  deleteApplication
);

module.exports = router;
