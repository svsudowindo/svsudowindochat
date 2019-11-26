var express = require('express');
var adminRoutes = express.Router();

var companyDAO = require('../controllers/auth/company/company.dao');
var userDAO = require('../controllers/auth/user/user.dao');
var personalDetailsDAO = require('../controllers/auth/user/details/personal-details.dao');
var employeementDAO = require('../controllers/auth/user/details/employment-details.dao');
var educationalDAO = require('../controllers/auth/user/details/educational-details.dao');
var bulkUploadDAO = require('../controllers/auth/user/bulk-import/bulk-import.dao');

adminRoutes.get('/:id/fetch-company-list', companyDAO.getAllCompanies);
adminRoutes.get('/:id/fetch-employees', userDAO.getAllUsers);
adminRoutes.post('/:id/reset-password', userDAO.resetPassword);
adminRoutes.get('/:id/getEmployeeByID/:employeeID', userDAO.getEmployeeByID);
adminRoutes.get('/:id/getAllEmployeeDetails/:companyID', userDAO.getAllEmployeesDetails);
adminRoutes.delete('/:id/delete-employee-by-id/:employeeID', userDAO.deleteEmployeeByID)

adminRoutes.get('/:id/get-company-details/:companyID', companyDAO.getCompanyById);
adminRoutes.post('/:id/update-company/:companyID', companyDAO.updateCompany);
adminRoutes.post('/:id/updateEmployee/:employeeID', userDAO.updateUserAPI);
adminRoutes.post('/:id/setPersonalDetails/:companyID', personalDetailsDAO.setPersonalDetails);
adminRoutes.get('/:id/getPersonalDetails/:companyID', personalDetailsDAO.getPersonalDetails);
adminRoutes.post('/:id/setEmployeementDetails/:companyID', employeementDAO.setEmploymentDetails);
adminRoutes.get('/:id/getEmployeementDetails/:companyID', employeementDAO.getEmployementDetails);
adminRoutes.post('/:id/setEducationalDetails/:companyID', educationalDAO.setEducationalDetails);
adminRoutes.get('/:id/getEducationalDetails/:companyID', educationalDAO.getEducationalDetails);

adminRoutes.post('/:id/employees-bulk-upload/:companyID', bulkUploadDAO.employeesBulkUpload);
exports.adminRoutes = adminRoutes;
