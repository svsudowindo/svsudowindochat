var mongoose = require('mongoose');

var companySchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  companyID: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: (new Date()).getMilliseconds()
  },
  updatedBy: {
    type: String,
    default: ''
  },
  updatedAt: {
    type: Date,
    default: (new Date()).getMilliseconds()
  },
  contractStartDate: {
    type: Date,
    required: true
  },
  contractEndDate: {
    type: Date,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  mobileNumber: {
    type: Number,
    required: true
  }
}, { strict: false })

var Company = mongoose.model("companies", companySchema);

module.exports = Company;
