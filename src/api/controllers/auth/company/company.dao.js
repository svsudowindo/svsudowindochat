var Company = require('./company.model');
var User = require('../user/user.model');
var userDAO = require('../user/user.dao');
var encryptDecrypt = require('../../../common/services/encrypt-decrypt');
exports.addCompany = (req, res, next) => {
  var payload = req.body;
  var createdRequest = req.params['id'];
  // createdRequest = encryptDecrypt.getNormalText(req.params['id']);

  console.log(encryptDecrypt.getCipherText(createdRequest));
  if (payload.role === 'SUPER_ADMIN') {
    createCompanyInDB(req, res, next);
  } else {
    User.find({ _id: createdRequest }, (userError, userResult) => {
      if (userError) {
        return res.send('Unable to fetch users');
      }
      if (userResult.length <= 0) {
        return res.send('No User exist');
      } else {
        if (payload.role === 'EMPLOYEE') {
          userDAO.createUser(req, res, next);
        } else {
          createCompanyInDB(req, res, next);
        }
      }
    })
  }

}


createCompanyInDB = (req, res, next) => {
  var payload = req.body;
  var createdRequest = req.params['id'];
  Company.find({ companyName: payload.companyName, companyID: payload.companyID }, (err, companyList) => {
    console.log(companyList);
    if (err) {
      // error response
      console.log('something went wrong');
      return res.send('Company Error');
    }
    if (companyList.length > 0) {
      console.log('length is greater');
      return res.send('user already exist');;
    }
    var companyData = new Company();
    companyData['companyName'] = payload.companyName;
    companyData['companyID'] = payload.companyID;
    companyData['createdBy'] = createdRequest;
    companyData.save((err, companyResponse) => {
      if (err) {
        console.log('something went wrong ');
        res.send('something went wrong');
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
