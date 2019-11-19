var mongoose = require('mongoose');

var PersonalDetailsSchema = mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    default: ''
  },
  dateOfBirth: {
    type: Date,
    default: null
  },
  email: {
    type: String,
    default: ''
  },
  phone: {
    type: Number,
    default: null
  },
  country: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  pinCode: {
    type: Number,
    default: null
  },
  address: {
    type: String,
    default: ''
  },
  createdBy: {
    type: String,
    default: ''
  },
  updatedBy: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: (new Date()).getMilliseconds()
  },
  updatedAt: {
    type: Date,
    default: (new Date()).getMilliseconds()
  },
  companyID: {
    type: String
  }
})

var PersonalDetails = mongoose.model('PersonalDetails', PersonalDetailsSchema);

module.exports = PersonalDetails;
