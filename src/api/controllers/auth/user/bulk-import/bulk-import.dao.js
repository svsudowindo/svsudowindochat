var User = require('../user.model');
var utils = require('../../../../common/services/utils');
var emailConfigService = require('../../../../common/email.config/email.config');
var validUsersList = [];
var invalidUsersList = [];
exports.employeesBulkUpload = (req, res, next) => {
  let payload = req.body;
  let userId = req.params.id;
  let companyID = req.params.companyID;
  User.find(({
    _id: userId,
    companyID: companyID,
    role: 'ADMIN'
  }), async (userError, userResult) => {
    if (userError) {
      return res.send(utils.sendResponse(500, null, ['Unauthorized User ... Please try with valid user'], 'Unauthorized User ... Please try with valid user'))
    }
    if (userResult.length <= 0) {
      return res.send(utils.sendResponse(500, null, ['Unauthorized User ... Please try with valid user'], 'Unauthorized User ... Please try with valid user'))
    }
    let counter = 0;
    for (let i = 0; i < payload.length; i++) {
      await validateUser(payload[i], companyID, userId);
      counter++;
    }
    let resultObj = {};
    resultObj['invalidRecords'] = invalidUsersList;
    if (payload.length === counter) {
      if (validUsersList.length > 0) {
        User.insertMany(validUsersList, (bulkInsertError, bulkInsertResult) => {
          if (bulkInsertError) {
            res.send(utils.sendResponse(500, null, ['Something went wrong on bulk operation... Please try again'], 'Something went wrong on bulk operation... Please try again'));
          }
          if (bulkInsertResult.length <= 0) {
            resultObj['validUserRecords'] = [];
            return res.send(utils.sendResponse(200, resultObj, [], 'No valid records found'));
          }
          resultObj['validUserRecords'] = bulkInsertResult;
          return res.send(utils.sendResponse(200, resultObj, [], 'Bulk Upload successfully completed'));
        })
      } else {
        return res.send(utils.sendResponse(200, resultObj, [], 'No valid records found'));
      }
    }
  })
}

async function validateUser(payload, companyID, userId) {
  await User.find({
    $or: [{
      companyID: companyID,
      id: payload.id
    }, {
      companyID: companyID,
      email: payload.email
    }]
  }, (validateUserError, validateUserResult) => {
    if (validateUserError) {
      payload['reason'] = 'Something went wrong... Try again';
      invalidUsersList.push(payload);
      return;
    }
    if (validateUserResult.length > 0) {
      payload['reason'] = 'User already exist';
      invalidUsersList.push(payload);
      return;
    }
    if (validateUserResult.length <= 0) {
      var user = {};
      user['name'] = payload.name;
      user['createdBy'] = userId;
      user['email'] = payload.email;
      user['role'] = payload.role;
      user['password'] = utils.generatePassword(8);
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
      user['createdAt'] = new Date().getHours();
      user['updatedAt'] = new Date().getHours();
      console.log(user);
      //   emailConfigService.sendMail(emailBody, 'Registration with SVsudowindo', 'You have registered with SVsudowindo chat application', 'Please Use following credentials to login', true)
      validUsersList.push(user);
    }
  })
}
