var ForgotPassword = require('./forgot-password.model');
var User = require('../user/user.model');
var UserDAO = require('../user/user.dao');
var Utils = require('../../../common/services/utils');
var EmailConfig = require('../../../common/email.config/email.config');
exports.forgotPassword = (req, res, next) => {
  let payload = req.body;
  User.find({email: payload.email, companyID: payload.companyID},(userErr, userList) => {
    if(userErr) {
      return res.send(Utils.sendResponse(500, null, ['Unable to fetch Users. Please try again...'], 'Unable to fetch Users. Please try again...'));
    }
    if (userList.length <= 0) {
      return res.send(Utils.sendResponse(500, null, ['No User exist with this company id and email'], 'No User exist with this company id and email'));
    }
    let userObj = Object.assign({}, userList[0]._doc);
    userObj.password = Utils.generatePassword(8);
    let emailBody = {email: userObj.email, password: userObj.password, companyID: userObj.companyID};
    EmailConfig.sendMail(emailBody, 'Changed Password for svsudowindo application.', 'Use the following credentials to login...', true);
    UserDAO.updateUser(req, res, next , userObj);
  });
}
