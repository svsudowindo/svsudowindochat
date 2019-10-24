var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  companyID: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  password: {
    type: String,
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
  dateOfJoining: {
    type: Date,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  designation: {
    type: String,
    required: true
  }
})

var User = mongoose.model('User', UserSchema);

module.exports = User;
