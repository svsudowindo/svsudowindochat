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
  Company.find({ companyName: payload.companyName, companyID: payload.companyID }, (err, companyList) => {
    if (err) {
      // error response
      return res.send('Company Error');
    }
    if (companyList.length > 0) {
      return res.send('user already exist');;
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
        console.log('something went wrong save', err);
        res.send('something went wrong in saving company');
        return;
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
