var express = require('express');
var adminRoutes = express.Router();

var companyDAO = require('../controllers/auth/company/company.dao');
var userDAO = require('../controllers/auth/user/user.dao');
var personalDetailsDAO = require('../controllers/auth/user/details/personal-details.dao');

adminRoutes.get('/:id/fetch-company-list', companyDAO.getAllCompanies);
adminRoutes.get('/:id/fetch-employees', userDAO.getAllUsers);
adminRoutes.post('/:id/reset-password', userDAO.resetPassword);
adminRoutes.get('/:id/getEmployeeByID/:employeeID', userDAO.getEmployeeByID);
adminRoutes.get('/:id/get-company-details/:companyID', companyDAO.getCompanyById);
adminRoutes.post('/:id/update-company/:companyID', companyDAO.updateCompany);
adminRoutes.post('/:id/updateEmployee/:employeeID', userDAO.updateUserAPI);
adminRoutes.post('/:id/setPersonalDetails/:companyID', personalDetailsDAO.setPersonalDetails);
adminRoutes.get('/:id/getPersonalDetails/:companyID', personalDetailsDAO.getPersonalDetails);
exports.adminRoutes = adminRoutes;
