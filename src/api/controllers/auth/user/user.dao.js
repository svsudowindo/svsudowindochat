var User = require('./user.model');
var utils = require('../../../common/services/utils')

exports.createUser = (req, res, next) => {
  let payload = req.body;
  User.find({ companyID: payload.companyID, email: payload.email }, (err, userslist) => {
    if (err) {
      console.log('fetch users error');
      return;
    }
    if (userslist.length > 0) {
      console.log('more than one user');
      return;
    }
    var user = new User();
    user['name'] = payload.name;
    user['createdBy'] = req.params['id'];
    user['email'] = payload.email;
    user['role'] = payload.role;
    user['password'] = utils.generatePassword(8);
    user['id'] = payload.id;
    user['companyID'] = payload.companyID;
    console.log(user);
    user.save((err, savedUser) => {
      if (err) {
        console.log('user creation failed', err);
      } else {
        console.log('success');
      }
    })
  })
}
