var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = mongoose.Schema({
  companyName : {
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
    default: Date.now()
  },
  updatedBy: {
    type: String,
    default: ''
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
}, { strict: false })

var Company = mongoose.model("companies", companySchema);

module.exports = Company;
