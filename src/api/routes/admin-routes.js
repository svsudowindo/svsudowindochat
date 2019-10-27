var express = require('express');
var adminRoutes = express.Router();

var companyDAO = require('../controllers/auth/company/company.dao');
var userDAO = require('../controllers/auth/user/user.dao');

adminRoutes.get('/:id/fetch-company-list', companyDAO.getAllCompanies);
adminRoutes.get('/:id/fetch-employees', userDAO.getAllUsers);
adminRoutes.post('/:id/reset-password', userDAO.resetPassword);
exports.adminRoutes = adminRoutes;
