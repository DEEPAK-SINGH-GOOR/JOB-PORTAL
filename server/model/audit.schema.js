const mongoose = require('mongoose');

const auditschema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jobportalsupport',
    required: true
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
