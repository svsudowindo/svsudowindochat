var EmployementDetails = require('./employment-details.model');
var User = require('./../../user/user.model');
var utils = require('../../../../common/services/utils');
exports.setEmploymentDetails = (req, res, next) => {
    const id = req.params.id;
    const companyID = req.params.companyID;
    const payload = req.body;
    User.find({ _id: id, companyID: companyID }, (userError, userResult) => {
        if (userError) {
            return res.send(utils.sendResponse(500, null, ['Unable to get user details... Please try again'], 'Unable to get user details... Please try again'));
        }
        if (userResult.length <= 0) {
            return res.send(utils.sendResponse(500, null, ['Unauthorized user'], 'Unauthorized user'));
        }

        EmployementDetails.find({ createdBy: id, companyID: companyID }, (employeementFetchError, employementFetchResult) => {
            if (employeementFetchError) {
                return res.send(utils.sendResponse(500, null, ['Unable to fetch employement details... Please try again'], 'Unable fetch employement details... Please try again'));
            }
            if (employementFetchResult.length <= 0) {
                // save data
                this.saveEmployementData(req, res, next);
            } else {
                // update data
                this.updateEmployementData(req, res, next);
            }

        })

    })
}

exports.saveEmployementData = (req, res, next) => {
    const id = req.params.id;
    const companyID = req.params.companyID;
    const payload = req.body;
    let employmentDetails = new EmployementDetails();
    employmentDetails['employementInfo'] = payload.employementInfo;
    employmentDetails['createdAt'] = new Date().getMilliseconds();
    employmentDetails['createdBy'] = id;
    employmentDetails['updatedBy'] = id;
    employmentDetails['updatedAt'] = new Date().getMilliseconds();
    employmentDetails['companyID'] = companyID;

    employmentDetails.save((employmentSaveError, employementSaveResult) => {
        if (employmentSaveError) {
            return res.send(utils.sendResponse(500, null, ['Unable to save employeement details ... Please try again'], 'Unable to save employeement details... Please try again'));
        }
        let document = Object.assign({}, employementSaveResult._doc);
        return res.send(utils.sendResponse(200, document, [], 'Employment details saved successfully'));
    })
}

exports.updateEmployementData = (req, res, next) => {
    const id = req.params.id;
    const companyID = req.params.companyID;
    const payload = req.body;
    let employmentDetails = {};
    employmentDetails['employementInfo'] = payload.employementInfo;
    employmentDetails['updatedBy'] = id;
    employmentDetails['updatedAt'] = new Date().getMilliseconds();
    employmentDetails['companyID'] = companyID;

    EmployementDetails.updateOne({ createdBy: id, companyID: companyID }, employmentDetails, (employementUpdateError, employmentUpdateResult) => {
        if (employementUpdateError) {
            return res.send(utils.sendResponse(500, null, ['Something went wrong.. Please try to update again'], 'Something went wrong.. Please try to update again'));
        }
        if (employmentUpdateResult['ok'] !== 1) {
            return res.send(utils.sendResponse(500, null, ['Unable to update Employement details'], 'Unable to update Employement details'));
        }
        return res.send(utils.sendResponse(200, employmentDetails, [], 'Updated successfully'))
    })
}


exports.getEmployementDetails = (req, res, next) => {
    var companyID = req.params.companyID;
    var userID = req.params.id;
    EmployementDetails.find({ createdBy: userID, companyID: companyID }, (employmenetDetailsError, employementDetailsResult) => {
        if (employmenetDetailsError) {
            return res.send(utils.sendResponse(500, null, ['Unable to fetch the personal details'], 'Unable to fetch the personal details'));
        }
        if (employementDetailsResult.length <= 0) {
            var data = new EmployementDetails();
            return res.send(utils.sendResponse(200, data, [], 'Personal details fetched successfully'));
        }
        return res.send(utils.sendResponse(200, employementDetailsResult[0]._doc));
    })
}