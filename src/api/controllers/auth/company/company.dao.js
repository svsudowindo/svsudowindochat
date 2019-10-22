var Company = require('./company.model');

var userDAO = require('../user/user.dao');
exports.addCompany = (req, res, next) => {
  var payload = req.body;
  var createdRequest = req.params['id'];
  console.log(createdRequest);
  Company.find({ companyName: payload.companyName, companyID: payload.companyID }, (err, companyList) => {
    console.log(companyList);
    if (err) {
      // error response
      console.log('something went wrong');
    }
    if (companyList.length > 0) {
      console.log('length is greater');
      return;
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
