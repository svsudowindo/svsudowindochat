var User = require('./user.model');
var utils = require('../../../common/services/utils')

exports.createUser = (req, res, next) => {
  let payload = req.body;
  if (payload.role === 'SUPER_ADMIN') {
    console.log()
    pushUserToDB(req, res, next);
  } else {
    User.find({ $or: [{ _id: req.params['id'], companyID: payload.companyID, role: 'ADMIN' }, { _id: req.params['id'], role: 'SUPER_ADMIN' }] }, (err, adminList) => {
      if (err) {
        return res.send('Unauthorized user to create err');
      }
      if (adminList.length <= 0) {
        return res.send('Unauthorized user to create');
      }
      pushUserToDB(req, res, next);
    })
  }
}

pushUserToDB = (req, res, next) => {
  let payload = req.body;
  User.find({ $or: [{ companyID: payload.companyID, email: payload.email }, { companyID: payload.companyID, id: payload.id }] }, (err, userslist) => {
    if (err) {
      console.log('fetch users error');
      return;
    }
    if (userslist.length > 0) {
      console.log('more than one user');
      res.send('Failed because of more users');
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
    user['dateOfJoining'] = payload.dateOfJoining;
    user['status'] = payload.status;
    user.save((err, savedUser) => {
      if (err) {
        console.log('user creation failed', err);
      } else {
        console.log('success');
        res.send('success');
      }
    })
  })
}
