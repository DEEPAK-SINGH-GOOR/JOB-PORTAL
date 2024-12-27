const mongoose = require('mongoose');

const auditschema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jobportalsupport',
  },
  emplyeeid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jobportal',
  },
  actiontype: {
    type: String,
    required: true
  },
  actiondescription: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['success', 'failure']
  }
}, {
  timestamps: true
});

const audit = mongoose.model('audit', auditschema);

module.exports = audit;
