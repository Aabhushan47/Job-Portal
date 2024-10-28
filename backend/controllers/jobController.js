const Job = require("../models/jobModel");

exports.getJobList = async (req, res) => {
  try {
    const job = await Job.find({ expired: false });
    res.status(200).json({ success: true, job });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error", err });
  }
};

exports.addJobs = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      country,
      city,
      location,
      salaryType,
      fixedSalary,
      salaryFrom,
      salaryTo,
    } = req.body;
    if (
      !title ||
      !description ||
      !category ||
      !country ||
      !city ||
      !location ||
      !salaryType
    ) {
      return res.status(400).json({ error: "Enter all details" });
    }

    if (salaryType === "rangedSalary" && (!salaryFrom || !salaryTo)) {
      return res.status(400).json({
        error:
          "Both salaryFrom and salaryTo must be provided for rangedSalary.",
      });
    }

    if (salaryType === "fixedSalary" && !fixedSalary) {
      return res
        .status(400)
        .json({ error: "fixedSalary must be provided for fixedSalary type." });
    }

    if (!salaryFrom && !salaryTo && !fixedSalary) {
      return res
        .status(400)
        .json({ error: "Enter either fixed or ranged salary." });
    }

    if ((salaryFrom || salaryTo) && fixedSalary) {
      return res
        .status(400)
        .json({ error: "Cannot enter both fixed and ranged salary." });
    }

    if ((salaryFrom && !salaryTo) || (!salaryFrom && salaryTo)) {
      return res.status(400).json({
        error: "Both salaryFrom and salaryTo must be provided together.",
      });
    }
    const postedBy = req.user._id;
    const job = await Job.create({
      title,
      description,
      category,
      country,
      city,
      location,
      salaryType,
      fixedSalary,
      salaryFrom,
      salaryTo,
      postedBy,
    });
    res
      .status(200)
      .json({ success: "true", message: "Job Posted Succesfully", job });
  } catch (err) {
    res.status(500).json({ error: "Internal Server error", err });
  }
};

exports.getmyJobs = async (req, res) => {
  try {
    const job = await Job.find({ postedBy: req.user._id });
    if (!job) {
      res.status(404).json({ error: "No Jobs Posted" });
    }
    res.status(200).json({ success: true, job });
  } catch (err) {
    res.status(500).json({ error: "Internal Server error", err });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    let job = await Job.findOne({ _id: id, postedBy: req.user._id });
    if (!job) {
      return res
        .status(404)
        .json({ error: "Job not found or not posted by this user." });
    }
    job = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res
      .status(200)
      .json({ success: true, message: "Updated Succesfully", job });
  } catch (err) {
    res.status(500).json({ error: "Internal Server error", err });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    let job = await Job.findOne({ _id: id, postedBy: req.user._id });
    if (!job) {
      return res
        .status(404)
        .json({ error: "Job not found or not posted by this user." });
    }
    await job.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Deleted Succesfully", job });
  } catch (err) {
    res.status(500).json({ error: "Internal Server error", err });
  }
};

exports.getJobDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.status(200).json({ success: true, job });
  } catch (err) {
    res.status(500).json({ error: "Internal Server error", err });
  }
};
