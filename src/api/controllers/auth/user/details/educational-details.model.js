var mongoose = require('mongoose');

var EducationalDetailsSchema = mongoose.Schema({
    educationalInfo: [
        {
            qualification: {
                type: String,
                default: ''
            },
            instituteName: {
                type: String,
                default: ''
            },
            location: {
                type: String,
                default: ''
            },
            state: {
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

var EducationalDetails = mongoose.model('EducationalDetails', EducationalDetailsSchema);

module.exports = EducationalDetails;
