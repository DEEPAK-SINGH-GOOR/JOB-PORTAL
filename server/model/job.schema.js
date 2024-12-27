const mongoose = require("mongoose");

const jobschema = new mongoose.Schema(
  {
    job_title: { type: String, required: true },
    job_description: { type: String, required: true },
    requirements: { type: [String], required: true },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      required: true,
    },
    companyid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'company',
      required: true
  },
    salary_range: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, enum: ["open", "closed"], default: "open" },
    posting_date: { type: Date, default: Date.now },
  },
  { timeseries: true }
);

const job = mongoose.model("job", jobschema);

module.exports = job;
