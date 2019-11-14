var EducationalDetails = require('./educational-details.model');
var User = require('./../../user/user.model');
var utils = require('../../../../common/services/utils');
exports.setEducationalDetails = (req, res, next) => {
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

        EducationalDetails.find({ createdBy: id, companyID: companyID }, (educationalFetchError, educationalFetchResult) => {
            if (educationalFetchError) {
                return res.send(utils.sendResponse(500, null, ['Unable to fetch educational details... Please try again'], 'Unable fetch educational details... Please try again'));
            }
            if (educationalFetchResult.length <= 0) {
                // save data
                this.saveEducationalData(req, res, next);
            } else {
                // update data
                this.updateEducationalData(req, res, next);
            }
        })

    })
}

exports.saveEducationalData = (req, res, next) => {
    const id = req.params.id;
    const companyID = req.params.companyID;
    const payload = req.body;
    let educationalDetails = new EducationalDetails();
    educationalDetails['educationalInfo'] = payload.educationalInfo;
    educationalDetails['createdAt'] = new Date().getMilliseconds();
    educationalDetails['createdBy'] = id;
    educationalDetails['updatedBy'] = id;
    educationalDetails['updatedAt'] = new Date().getMilliseconds();
    educationalDetails['companyID'] = companyID;

    educationalDetails.save((educationalSaveError, educationalSaveResult) => {
        if (educationalSaveError) {
            return res.send(utils.sendResponse(500, null, ['Unable to save employeement details ... Please try again'], 'Unable to save employeement details... Please try again'));
        }
        if (educationalSaveResult) {
            let document = Object.assign({}, educationalSaveResult._doc);
            return res.send(utils.sendResponse(200, document, [], 'Employment details saved successfully'));
        }
    })
}

exports.updateEducationalData = (req, res, next) => {
    const id = req.params.id;
    const companyID = req.params.companyID;
    const payload = req.body;
    let obj = {};
    obj['educationalInfo'] = payload.educationalInfo;
    obj['updatedBy'] = id;
    obj['updatedAt'] = new Date().getMilliseconds();
    obj['companyID'] = companyID;

    EducationalDetails.updateOne({ createdBy: id, companyID: companyID }, obj, (educationalUpdateError, educationalUpdateResult) => {
        if (educationalUpdateError) {
            return res.send(utils.sendResponse(500, null, ['Something went wrong.. Please try to update again'], 'Something went wrong.. Please try to update again'));
        }
        if (educationalUpdateResult['ok'] !== 1) {
            return res.send(utils.sendResponse(500, null, ['Unable to update Educational details'], 'Unable to update Educational details'));
        }
        return res.send(utils.sendResponse(200, obj, [], 'Updated successfully'))
    })
}


exports.getEducationalDetails = (req, res, next) => {
    var companyID = req.params.companyID;
    var userID = req.params.id;
    EducationalDetails.find({ createdBy: userID, companyID: companyID }, (educationalDetailsError, educationalDetailsResult) => {
        if (educationalDetailsError) {
            return res.send(utils.sendResponse(500, null, ['Unable to fetch the personal details'], 'Unable to fetch the personal details'));
        }
        if (educationalDetailsResult.length <= 0) {
            var data = new EducationalDetails();
            return res.send(utils.sendResponse(200, data, [], 'Personal details fetched successfully'));
        }
        return res.send(utils.sendResponse(200, educationalDetailsResult[0]._doc));
    })
}