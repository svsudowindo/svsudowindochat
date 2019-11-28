var mongoose = require('mongoose');

var EmployeeDesignationsSchema = mongoose.Schema({
  companyID: {
    type: String,
    required: true
  },
  designations: [{
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }],
  createdBy: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date().getMilliseconds()
  },
  updatedBy: {
    type: String,
    default: ''
  },
  updatedAt: {
    type: Date,
    default: new Date().getMilliseconds()
  }
})

var EmployeeDesingations = mongoose.model('designations', EmployeeDesignationsSchema);

module.exports = EmployeeDesingations;
