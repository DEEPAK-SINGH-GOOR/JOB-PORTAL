const mongoose = require('mongoose');

const Jobportalsupportschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: 'The email address is not valid!'
      }
    },
    password: {
      type: String,
      trim: true,
      required: true,
      validate: {
        validator: function (v) {
          return v.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{6,}$/);
        },
        message: 'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      }
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['jobseeker', 'recruiter'],
      default: 'jobseeker'
    },
    profilePicture: {
      type: String,
      required : true
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v);
        },
        message: `is not a valid phone number!`
      }
    },
    permissions: {
      type: [String],
      default: []
    },
    lastLogin: {
      type: Date,
      default: null
    },
    accountCreatedDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
    tokens: [
      {
        type: String,
        required : true
      },
    ],
    otps: [
      {
        type: String, 
      },
    ],
    ip_address: [
      {
        type: String,
      },
    ],
    company_details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'company',
      required : true
    },
  },
  {
    timestamps: true
  }
);


const Jobportalsupport = mongoose.model('Jobportalsupport', Jobportalsupportschema);

module.exports = Jobportalsupport;
