var Login = require('./login.model');
var User = require('../user/user.model');
var Utils = require('../../../common/services/utils');
exports.login = (req, res, next) => {
  var payload = req.body;
  User.find({ email: payload.email, password: payload.password, companyID: payload.companyID, status: 1 }, (loginErr, loginResult) => {
    if (loginErr) {
      return res.send(Utils.sendResponse(500, null, ['Unable to fetch Users. Please try again...'], 'Unable to fetch Users. Please try again...'));
    }
    if (loginResult.length <= 0) {
      return res.send(Utils.sendResponse(500, null, ['Username , Password or Company ID are invalid or company is inactive'], 'Unauthorized User.'));
    }
    let responseObj = Object.assign({}, loginResult[0]._doc);
    delete responseObj.password;
    return res.send(Utils.sendResponse(200, responseObj, [], 'Logged In Successfully'));
  })
}
