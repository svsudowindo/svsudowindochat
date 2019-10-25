var mongoose = require('mongoose');

var ForgotPasswordSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  companyID: {
    type: String,
    required: true
  }
})

var ForgotPassword = mongoose.model('forgotPassword', ForgotPasswordSchema);

module.exports = ForgotPassword;
