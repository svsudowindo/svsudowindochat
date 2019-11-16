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
      companyID: payload.companyID
    };
    user['id'] = payload.id;
    user['companyID'] = payload.companyID;
    user['dateOfJoining'] = payload.dateOfJoining;
    user['status'] = payload.status;
    user['designation'] = payload.designation;
    emailService.sendMail(emailBody, 'Registration with SVsudowindo', 'You have registered with SVsudowindo chat application', 'Please Use following credentials to login', true);
    user.save((err, savedUser) => {
      this.sendUserInfo(req, res, next, err, [savedUser]);
    })
  })
}

this.sendUserInfo = (req, res, next, userError, userResult) => {
  if (userError) {
    return res.send(Utils.sendResponse(500, null, ['Unable to fetch user. Please try again'], 'Unable to fetch user. Please try again'));
  }
  if (userResult.length <= 0) {
    return res.send(Utils.sendResponse(400, null, ['Unauthorized user'], 'Unauthorized user'));
  }
  let document = Object.assign({}, userResult[0]._doc);
  delete document.password;
  return res.send(Utils.sendResponse(200, document, [], 'Fetched employee'));
}

exports.updateUserAPI = (req, res, next) => {
  const payload = req.body;
  const requesteByID = req.params.id;
  const employeeID = req.params.employeeID;
  User.find({ id: employeeID, role: 'EMPLOYEE', companyID: payload.companyID }, (employeeFindError, employeeResult) => {
    if (employeeFindError) {
      return res.send(Utils.sendResponse(500, null, ['Something went wrong. Please try again'], 'Something went wrong. Please try again'));
    }
    if (employeeResult.length <= 0) {
      return res.send(Utils.sendResponse(500, null, ['No User Exist'], 'No user exist'));
    }
    let obj = {
      name: payload.name,
      email: payload.email,
      role: payload.role,
      updatedBy: requesteByID,
      id: employeeID,
      updatedAt: new Date().getMilliseconds(),
      status: payload.status
    }
    this.updateUser(req, res, next, obj);
  })
}
exports.updateUser = (req, res, next, upadateUserObject) => {
  User.updateOne({ id: upadateUserObject.id }, upadateUserObject, (updateUserError, updateUserResult) => {
    if (updateUserError) {
      return res.send(Utils.sendResponse(500, null, ['Something went wrong. Please try to update again'], 'Something went wrong. Please try to update again'));
    }
    if (updateUserResult['ok'] !== 1) {
      return res.send(Utils.sendResponse(500, null, ['Something went wrong. Please try to update again'], 'Something went wrong. Please try to update again'));
    }
    return res.send(Utils.sendResponse(200, 'User updated successfully', [], 'User Updated Successfully'));
  })
}

exports.getAllUsers = (req, res, next) => {
  let payload = req.body;
  User.find({ createdBy: req.params.id }, (userError, userResult) => {
    if (userError) {
      return res.send(Utils.sendResponse(500, null, ['Unable to fetch employees list'], 'Unable to fetch employees list'));
    }
    return res.send(Utils.sendResponse(200, userResult, [], 'Fetched successfully'));
  })
}

exports.resetPassword = (req, res, next) => {
  let payload = req.body;
  User.find({ _id: req.params.id, password: payload.password }, (userError, userResult) => {
    if (userError) {
      return res.send(Utils.sendResponse(500, null, ['Unable to fetch user. Please try again'], 'Unable to fetch user. Please try again'));
    }
    if (userResult.length <= 0) {
      return res.send(Utils.sendResponse(500, null, ['No User exists'], 'No User exists'));
    }
    var document = Object.assign({}, userResult[0]._doc);
    document.password = payload.newPassword;
    document.updatedBy = req.params.id;
    document.updatedAt = (new Date()).getMilliseconds();
    this.updateUser(req, res, next, document);
  });
}

exports.getEmployeeByID = (req, res, next) => {
  console.log(req.params.employeeID);
  User.find({ _id: req.params.employeeID }, (userError, userResult) => {
    this.sendUserInfo(req, res, next, userError, userResult);
  })
}


exports.getEmployeeByCompanyID = (req, res, next, otherObject = null) => {
  let companyID = req.params['companyID'];
  User.find({ companyID: companyID, role: 'ADMIN' }, (employeeError, employeeResult) => {
    if (employeeError) {
      return res.send(Utils.sendResponse(500, null, ['Unable to fetch user by company id . Please try again'], 'Unable to fetch user by company id . Please try again'));
    }
    if (employeeResult.length <= 0) {
      return res.send(Utils.sendResponse(500, null, ['No employee exist . Please try again'], 'No employee exist. Please try again'));
    }
    if (otherObject !== null) {
      let employee = employeeResult[0]._doc;
      delete employee.password;
      let otherDetails = {
        otherData: otherObject,
        employeeDetails: employee
      };
      return res.send(Utils.sendResponse(200, otherDetails, [], 'Success'));
    } else {
      this.sendUserInfo(req, res, next, employeeError, employeeResult)
    }
  })
}
