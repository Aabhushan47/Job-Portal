const Application = require("../models/applicationModel");
const cloudinary = require("cloudinary");
const Job = require("../models/jobModel");
exports.getCandidateApplications = async (req, res) => {
  try {
    const application = await Application.find({
      "applicant.applicant_id": req.user._id,
    });

    res.status(200).json({ success: true, application });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" }, err.message);
  }
};

exports.getEmployerApplications = async (req, res) => {
  try {
    const application = await Application.find({
      "employer.employer_id": req.user._id,
    });
    if (!application) {
      res.status(400).json({ error: "No application found for this user" });
    }
    res.status(200).json({ success: true, application });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" }, err.message);
  }
};

exports.postApplication = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const { path } = req.file;
    const cloudinaryResponse = await cloudinary.uploader.upload(path, {
      resource_type: "auto",
    });

    const { name, email, phone, coverLetter, address, jobId } = req.body;

    const applicant = {
      applicant_id: req.user._id,
      role: "candidate",
    };

    if (!jobId) {
      return res.status(404).json({ error: "No job found" });
    }

    const JobDetail = await Job.findById(jobId);
    if (!JobDetail) {
      return res.status(404).json({ error: "No job found" });
    }

    const employer = {
      employer_id: JobDetail.postedBy,
      role: "employer",
    };

    const resume = {
      public_id: cloudinaryResponse.public_id,
      secure_url: cloudinaryResponse.secure_url,
    };

    const application = await Application.create({
      name,
      email,
      phone,
      coverLetter,
      address,
      applicant,
      employer,
      resume,
    });

    res.status(200).json({
      message: "Application posted successfully",
      data: application,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

// exports.postApplication = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const resume = await cloudinary.uploader.upload(req.file.path, {
//       resource_type: "raw",
//     });
//     res
//       .status(200)
//       .json({ message: "File uploaded successfully", data: resume });
//   } catch (err) {
//     console.error(err);
//     res
//       .status(500)
//       .json({ error: "Internal Server Error", message: err.message });
//   }
// };
