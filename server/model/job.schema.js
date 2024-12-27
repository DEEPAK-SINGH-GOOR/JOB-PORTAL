const { default: mongoose } = require("mongoose");

const jobSchema = new mongoose.Schema({
  job_title: { type: String, required: true },
  job_description: { type: String, required: true },
  requirements: { type: [String], required: true }, // Array of strings
  salary_range: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ["open", "closed"], default: "open" },
  posting_date: { type: Date, default: Date.now },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
