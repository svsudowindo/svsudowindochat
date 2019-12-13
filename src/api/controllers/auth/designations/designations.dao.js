var EmployeeDesinations = require('./designations.model');
var User = require('../user/user.model');
var Utils = require('../../../common/services/utils');
exports.createOrUpdateEmployeeDesignations = (req, res, next) => {
  const userID = req.params.id;
  const companyID = req.params.companyID;
  User.find({
    _id: userID,
    companyID: companyID,
    role: 'ADMIN'
  }, (userError, userResult) => {
    if (userError) {
      return res.send(Utils.sendResponse(500, null, ['Something went wrong to fetch the user.. Please try again ..'], 'Something went wrong to fetch the user.. Please try again ..'));
    }
    if (userResult.length <= 0) {
      return res.send(Utils.sendResponse(403, null, ['Unauthorized User...'], 'Unauthorized User...'));
    }
    EmployeeDesinations.find({
      companyID: companyID
    }, (employeeDesignationError, employeeDesignationResult) => {
      if (employeeDesignationError) {
        return res.send(Utils.sendResponse(500, null, ['Something went wrong to fetch the user ... Please try again ..'], 'Something went wrong to fetch the user ... Please try again ..'));
      }
      if (employeeDesignationResult.length <= 0) {
        this.createEmployeeDesignation(req, res, next);
      } else if (employeeDesignationResult.length > 0) {
        this.updateEmployeeDesignation(req, res, next);
      }
    })
  })
}

exports.createEmployeeDesignation = (req, res, next) => {
  const userID = req.params.id;
  const companyID = req.params.companyID;
  var employeeDesignations = new EmployeeDesinations({
    companyID: companyID,
    designations: req.body.designations,
    createdBy: userID,
    updatedBy: userID,
    companyID: companyID
  });
  employeeDesignations.save((designationsError, designationsResult) => {
    if (designationsError) {
      return res.send(Utils.sendResponse(500, null, ['Something went wrong in saving Designations... Please try again ...'], 'Something went wrong in saving Designations... Please try again ...'))
    }
    return res.send(Utils.sendResponse(200, designationsResult, [], 'Saved Successfully'));
  })
}

exports.updateEmployeeDesignation = (req, res, next) => {
  const userID = req.params.id;
  const companyID = req.params.companyID;
  let obj = {
    companyID: companyID,
    designations: req.body.designations,
    updatedBy: userID,
    updatedAt: new Date().getMilliseconds()
  }
  EmployeeDesinations.updateOne({
    companyID: companyID
  }, obj, (updateError, updateResult) => {
    if (updateError) {
      return res.send(Utils.sendResponse(500, null, ['Something went wrong in updating the employee designation... Please try again'], 'Something went wrong in updating the employee designation... Please try again'));
    }
    if (updateResult['ok'] === 1) {
      return res.send(Utils.sendResponse(200, 'Updated Successfully', [], 'Updated Successfully'));
    } else {
      return res.send(Utils.sendResponse(200, null, ['Unable to Update... Please try again'], 'Unable to Update... Please try again'));
    }
  })
}

exports.fetchEmployeeDesignations = (req, res, next) => {
  const userID = req.params.id;
  const companyID = req.params.companyID
  User.find({
    _id: userID,
    companyID: companyID,
    role: 'ADMIN'
  }, (userError, userResult) => {
    if (userError) {
      return res.send(Utils.sendResponse(500, null, ['Something went wrong to fetch the user.. Please try again ..'], 'Something went wrong to fetch the user.. Please try again ..'));
    }
    if (userResult.length <= 0) {
      return res.send(Utils.sendResponse(403, null, ['Unauthorized User...'], 'Unauthorized User...'));
    }
    EmployeeDesinations.find({companyID: companyID}, (employeeDesignationError, employeeDesignationResult) => {
        if (employeeDesignationError) {
            return res.send(Utils.sendResponse(500, null, ['Something went wrong in fetching employee designations... Please try again..'], 'Something went wrong in fetching employee designations... Please try again..'));
        }
        if (employeeDesignationResult.length <= 0) {
            return res.send(Utils.sendResponse(200, [], [], 'Employee Designations Successfully fetched'))
        }
        return res.send(Utils.sendResponse(200, employeeDesignationResult[0], [], 'Employee Designations Fetched successfully'))
    })
  })
}
