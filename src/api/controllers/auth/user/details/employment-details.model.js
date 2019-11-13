var mongoose = require('mongoose');

var EmployementDetailsSchema = mongoose.Schema({
    employementInfo: [
        {
            previousCompanyName: {
                type: String,
                default: ''
            },
            previousCompanyID: {
                type: String,
                default: ''
            },
            location: {
                type: String,
                default: ''
            },
            role: {
                type: String,
                default: ''
            },
            startDate: {
                type: Date,
                default: null
            },
            endDate: {
                type: Date,
                default: null
            }
        }
    ],
    createdBy: {
        type: String,
        default: ''
    },
    updatedBy: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: (new Date()).getMilliseconds()
    },
    updatedAt: {
        type: Date,
        default: (new Date()).getMilliseconds()
    },
    companyID: {
        type: String
    }
})

var EmployementDetails = mongoose.model('EmployeementDetails', EmployementDetailsSchema);

module.exports = EmployementDetails;
