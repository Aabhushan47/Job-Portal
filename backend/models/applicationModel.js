const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const applicationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  coverLetter: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  applicant: {
    applicant_id: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["candidate"],
      required: true,
    },
  },
  employer: {
    employer_id: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["employer"],
      required: true,
    },
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
