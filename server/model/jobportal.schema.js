const { default: mongoose } = require("mongoose");

const jobPortalSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  role: { type: String, enum: ["admin", "employer"], required: true },
  profile_picture: { type: String, default: "" },
  phone_number: { type: String, required: true },
  permissions: { type: [String], default: [] }, // Array of permissions
  last_login: { type: Date },
  account_created_date: { type: Date, default: Date.now },
  status: { type: String, enum: ["active", "inactive"], default: "inactive" },
  audit_logs: {
    type: [
      {
        action: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        performed_by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "JobPortal",
        },
      },
    ],
    default: [],
  },
  tokens: { type: [String], default: [] }, // Array for session or access tokens
  otps: { type: [String], default: [] }, // Array for storing OTPs
  ip_address: { type: [String], default: [] }, // Array for IP tracking
});

module.exports = jobPortalSchema;
