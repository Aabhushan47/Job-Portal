const express = require("express");
const router = express.Router();
const { isAuthorized, isEmployer } = require("../middlewares/auth");
const {
  getJobList,
  addJobs,
  getmyJobs,
  updateJob,
  deleteJob,
  getJobDetails,
} = require("../controllers/jobController");

router.get("/joblist", getJobList);
router.get("/jobdetail/:id", getJobDetails);
router.post("/addjob", isAuthorized, isEmployer, addJobs);
router.get("/myjob", isAuthorized, isEmployer, getmyJobs);
router.put("/updatejob/:id", isAuthorized, isEmployer, updateJob);
router.delete("/deletejob/:id", isAuthorized, isEmployer, deleteJob);

module.exports = router;
