const mongoose = require("mongoose");

const jobportalschema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: "The email address is not valid!",
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v.match(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{6,}$/
        );
      },
      message:
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }
  },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  role: { type: String, enum: ["admin", "employer"], default : "employer" },
  profile_picture: { type: String, default: "" },
  phone_number: { type: String, required: true },
  permissions: { type: [String], default: [] }, 
  last_login: { type: Date },
  account_created_date: { type: Date, default: Date.now },
  status: { type: String, enum: ["active", "inactive"], default: "inactive" },
  audit_logs: {
    type: [
      {
        performed_by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "audit",
        },
      },
    ],
    default: [],
  },
  tokens: { type: [String], default: [] }, 
  otps: { type: [String], default: [] },
  ip_address: { type: [String], default: [] },
});

const jobportal = mongoose.model('jobportal',jobportalschema);

module.exports = jobportal;
