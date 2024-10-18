const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    parentName: { type: String, required: true },
    feeSubmissionDate: { type: Date, required: true },
    receipt: { type: String, required: true },
    hasPaidFees: { type: Boolean, default: true },
  });

module.exports = mongoose.model('Student', studentSchema);
