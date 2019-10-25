var User = require('./user.model');
var Utils = require('../../../common/services/utils')
var emailService = require('../../../common/email.config/email.config');
exports.createUser = (req, res, next) => {
  let payload = req.body;
  if (payload.role === 'SUPER_ADMIN') {
    pushUserToDB(req, res, next);
  } else {
    User.find({ $or: [{ _id: req.params['id'], companyID: payload.companyID, role: 'ADMIN' }, { _id: req.params['id'], role: 'SUPER_ADMIN' }] }, (err, adminList) => {
      if (err) {
        return res.send(Utils.sendResponse(500, null, ['Unable to fetch Users. Please try again...'], 'Unable to fetch Users. Please try again...'));
      }
      if (adminList.length <= 0) {
        return res.send(Utils.sendResponse(500, null, ['Unauthorized User'], 'Unauthorized User'));
      }
      pushUserToDB(req, res, next);
    })
  }
}

pushUserToDB = (req, res, next) => {
  let payload = req.body;
  User.find({ $or: [{ companyID: payload.companyID, email: payload.email }, { companyID: payload.companyID, id: payload.id }] }, (err, userslist) => {
    if (err) {
      return res.send(Utils.sendResponse(500, null, ['Unable to fetch Users'], 'Unable to fetch Users'));
    }
    if (userslist.length > 0) {
      return res.send(Utils.sendResponse(500, null, ['User Already Exist'], 'User Already Exist'));
    }
    var user = new User();
    user['name'] = payload.name;
    user['createdBy'] = req.params['id'];
    user['email'] = payload.email;
    user['role'] = payload.role;
    user['password'] = Utils.generatePassword(8);
    let emailBody = {
      email: user.email,
      password: user.password,
      companyID: user.companyID
    };
    user['id'] = payload.id;
    user['companyID'] = payload.companyID;
    user['dateOfJoining'] = payload.dateOfJoining;
    user['status'] = payload.status;
    user['designation'] = payload.designation;
    emailService.sendMail(emailBody, 'Registration with SVsudowindo', 'You have registered with SVsudowindo chat application', 'Please Use following credentials to login', true);
    user.save((err, savedUser) => {
      let user = Object.assign({}, savedUser._doc);
      if (err) {
        return res.send(Utils.sendResponse(500, null, ['User Creation failed'], 'User Creation failed'));
      } else {
        delete user.password;
        return res.send(Utils.sendResponse(200, user, [], 'User Created Successfully'));
      }
    })
  })
}
