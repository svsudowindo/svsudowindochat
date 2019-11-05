var Company = require('./company.model');
var User = require('../user/user.model');
var userDAO = require('../user/user.dao');
var Utils = require('../../../common/services/utils');
var encryptDecrypt = require('../../../common/services/encrypt-decrypt');
exports.addCompany = (req, res, next) => {
  var payload = req.body;
  var createdRequest = req.params['id'];
  // createdRequest = encryptDecrypt.getNormalText(req.params['id']);
  if (payload.role === 'SUPER_ADMIN') {
    if (payload.contractStartDate < payload.contractEndDate) {
      createCompanyInDB(req, res, next);
    } else {
      return res.send(Utils.sendResponse(500, null, ['Contract From date must be less than contract To Date.'], 'Contract From date must be less than contract To Date.'));
    }
  } else {
    User.find({ _id: createdRequest }, (userError, userResult) => {
      if (userError) {
        return res.send(Utils.sendResponse(500, null, ['Unable to fetch Users. Please try again...'], 'Unable to fetch Users. Please try again...'));
      }
      if (userResult.length <= 0) {
        return res.send('No User exist');
      } else {
        if (payload.role === 'EMPLOYEE') {
          userDAO.createUser(req, res, next);
        } else {
          if (payload.contractStartDate < payload.contractEndDate) {
            createCompanyInDB(req, res, next);
          } else {
            return res.send(Utils.sendResponse(500, null, ['Contract From date must be less than contract To Date.'], 'Contract From date must be less than contract To Date.'));
          }
        }
      }
    })
  }
}


createCompanyInDB = (req, res, next) => {
  var payload = req.body;
  var createdRequest = req.params['id'];
  Company.find({ companyID: payload.companyID }, (err, companyList) => {
    if (err) {
      // error response
      return res.send(Utils.sendResponse(500, null, ['Company creation error'], 'Company creation error'));
    }
    if (companyList.length > 0) {
      return res.send(Utils.sendResponse(500, null, ['User already exist'], 'User already exist'));
    }
    var companyData = new Company();
    companyData['companyName'] = payload.companyName;
    companyData['companyID'] = payload.companyID;
    companyData['createdBy'] = createdRequest;
    companyData['contractStartDate'] = payload.contractStartDate;
    companyData['contractEndDate'] = payload.contractEndDate;
    companyData['status'] = payload.status;
    companyData['mobileNumber'] = payload.mobileNumber;
    companyData.save((err, companyResponse) => {
      if (err) {
        return res.send(Utils.sendResponse(500, null, ['something went wrong in saving company'], 'something went wrong in saving company'));
      }
      if (companyResponse) {
        // return res.send('success');
        if (payload.role !== 'SUPER_ADMIN') {
          userDAO.createUser(req, res, next);
        } else {
          req.params['id'] = companyResponse._id;
          userDAO.createUser(req, res, next);
        }
      }
    })
  })
}

exports.getAllCompanies = (req, res, next) => {
  const id = req.params['id'];
  User.find({ _id: id, role: 'SUPER_ADMIN' }, (userError, userResult) => {
    if (userError) {
      return Utils.sendResponse(500, null, ['Unable to fetch user data ...'], 'Unable to fetch user data ...');
    }
    if (userResult.length <= 0) {
      return Utils.sendResponse(500, null, ['User does"nt exist'], 'User does"nt exist');
    }
    getCompaniesList(req, res, next);
  })
}

getCompaniesList = (req, res, next) => {
  let payload = req.body;
  Company.find({ createdBy: req.params['id'] }, (companyListError, companyListResult) => {
    if (companyListError) {
      return res.send(Utils.sendResponse(500, null, ['Unable to fetch companies.. Please try again', 'Unable to fetch companies.. Please try again']));
    }
    return res.send(Utils.sendResponse(200, companyListResult, [], 'Fetched companies list'));
  })
}

exports.getCompanyById = (req, res, next) => {
  let companyID = req.params['companyID'];
  User.find({ _id: req.params['id'], role: 'SUPER_ADMIN' }, (userError, userResult) => {
    if (userError) {
      return res.send(Utils.sendResponse(500, null, ['Unable to fetch User details.. Please try again'], 'Unable to fetch User details.. Please try again'));
    }
    if (userResult.length <= 0) {
      return res.send(Utils.sendResponse(500, null, ['User doesn"t exeed'], 'User doesn"t exeed'));
    }
    Company.find({ companyID: companyID }, (companyError, companyList) => {
      if (companyError) {
        return res.send(Utils.sendResponse(500, null, ['Unable to fetch company details.. Please try again'], 'Unable to fetch company details.. Please try again'));
      }
      if (companyList.length <= 0) {
        return res.send(Utils.sendResponse(500, null, ['No company found'], 'No company found'));
      }
      userDAO.getEmployeeByCompanyID(req, res, next, companyList[0]._doc);
    })
  })

}

exports.updateCompany = (req, res, next) => {
  var superAdminID = req.params.id;
  var companyID = req.params.companyID;
  let payload = req.body;
  User.find({ _id: superAdminID }, (userError, userResult) => {
    if (userError) {
      return res.send(Utils.sendResponse(500, null, ['Unable to Update company details.. Please try again'], 'Unable to Update company details.. Please try again'));
    }
    if (userResult.length <= 0) {
      return res.send(Utils.sendResponse(500, null, ['Not a super admin to update company details'], 'Not a super admin to update company details'));
    }

    Company.find({ createdBy: superAdminID, companyID: companyID }, (companyError, companyDetails) => {
      if (companyError) {
        return res.send(Utils.sendResponse(500, null, ['Unable to Update company details.. Please try again'], 'Unable to Update company details.. Please try again'));
      }
      if (companyDetails.length <= 0) {
        return res.send(Utils.sendResponse(500, null, ['No company found. Please try to update valid company id'], 'No company found. Please try to update valid company id'));
      }
      let obj = {
        updatedBy: superAdminID,
        updatedAt: (new Date()).getMilliseconds(),
        contractStartDate: payload.contractStartDate,
        contractEndDate: payload.contractEndDate,
        status: payload.status,
        mobileNumber: payload.mobileNumber,
        companyName: payload.companyName
      }
      Company.updateOne({ companyID: companyID }, obj, (companyUpdateError, companySuccess) => {
        if (companyError) {
          return res.send(Utils.sendResponse(500, null, ['Unable to Update company details.. Please try again'], 'Unable to Update company details.. Please try again'));
        }
        userDAO.updateUser(req, res, next, req.body);
      })
    })
  })
}
