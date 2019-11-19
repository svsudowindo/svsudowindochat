var User = require('../user.model');
var utils = require('../../../../common/services/utils');
var PersonalDetails = require('./personal-details.model');
exports.setPersonalDetails = (req, res, next) => {
  const userID = req.params.id;
  const companyID = req.params.companyID;
  User.find({ _id: userID, companyID: companyID }, (userError, userResult) => {
    if (userError) {
      return res.send(utils.sendResponse(500, null, ['Something went wrong.. Please try again'], 'Something went wrong.. Please try again'));
    }
    if (userResult.length <= 0) {
      return res.send(utils.sendResponse(403, null, ['Unauthorized access... Please try with authorized credentials'], 'Unauthorized access... Please try with authorized credentials'))
    }
    PersonalDetails.find({ createdBy: userID, companyID: companyID }, (personalError, personalResult) => {
      if (personalError) {
        return res.send(utils.sendResponse(500, null, ['Something went wrong... Please try again...'], 'Something went wrong... Please try again...'))
      }
      if (personalResult.length <= 0) {
        return this.createPersonalDetails(req, res, next);
      }
      if (personalResult.length > 0) {
        return this.updatePersonalDetails(req, res, next);
      }
    })
  })
}

exports.updatePersonalDetails = (req, res, next) => {
  const payload = req.body;
  var personalDetails = {};
  personalDetails['name'] = payload.name;
  personalDetails['gender'] = payload.gender;
  personalDetails['dateOfBirth'] = payload.dateOfBirth;
  personalDetails['email'] = payload.email;
  personalDetails['phone'] = payload.phone;
  personalDetails['country'] = payload.country;
  personalDetails['state'] = payload.state;
  personalDetails['city'] = payload.city;
  personalDetails['pinCode'] = payload.pinCode;
  personalDetails['address'] = payload.address;
  personalDetails['companyID'] = req.params.companyID;
  personalDetails['updatedBy'] = req.params.id;
  personalDetails['updatedAt'] = new Date().getMilliseconds();
  PersonalDetails.updateOne({ createdBy: req.params.id, companyID: req.params.companyID }, personalDetails, (personalUpdateError, personalUpdateResult) => {
    if (personalUpdateError) {
      return res.send(utils.sendResponse(500, null, ['Something went wrong.. Please try to update again'], 'Something went wrong.. Please try to update again'));
    }
    if (personalUpdateResult['ok'] !== 1) {
      return res.send(utils.sendResponse(500, null, ['Unable to update personal details'], 'Unable to update personal details'));
    }
    return res.send(utils.sendResponse(200, personalDetails, [], 'Updated successfully'))
  })
}

exports.createPersonalDetails = (req, res, next) => {
  const payload = req.body;
  var personalDetails = new PersonalDetails();
  personalDetails['name'] = payload.name;
  personalDetails['gender'] = payload.gender;
  personalDetails['dateOfBirth'] = payload.dateOfBirth;
  personalDetails['email'] = payload.email;
  personalDetails['phone'] = payload.phone;
  personalDetails['country'] = payload.country;
  personalDetails['state'] = payload.state;
  personalDetails['city'] = payload.city;
  personalDetails['pinCode'] = payload.pinCode;
  personalDetails['address'] = payload.address;
  personalDetails['companyID'] = req.params.companyID;
  personalDetails['createdBy'] = req.params.id;
  personalDetails['createdAt'] = new Date().getMilliseconds();

  personalDetails.save((err, savedUser) => {
    if (err) {
      return res.send(utils.sendResponse(500, null, ['Unable to save personal details'], 'Unable to save personal details'));
    }
    let document = Object.assign({}, savedUser._doc);
    return res.send(utils.sendResponse(200, document, [], 'Personal details saved successfully'));
  })

}

exports.getPersonalDetails = (req, res, next) => {
  var companyID = req.params.companyID;
  var userID = req.params.id;
  PersonalDetails.find({ createdBy: userID, companyID: companyID }, (personalDetailsError, personalDetailsResult) => {
    if (personalDetailsError) {
      return res.send(utils.sendResponse(500, null, ['Unable to fetch the personal details'], 'Unable to fetch the personal details'));
    }
    if (personalDetailsResult.length <= 0) {
      var data = new PersonalDetails();
      return res.send(utils.sendResponse(200, data, [], 'Personal details fetched successfully'));
    }
    return res.send(utils.sendResponse(200, personalDetailsResult[0]._doc));
  })
}
