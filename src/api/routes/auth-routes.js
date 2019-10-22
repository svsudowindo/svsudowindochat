var express = require('express');
var authRoutes = express.Router();

var companyDAO = require('../controllers/auth/company/company.dao');
var userDAO = require('../controllers/auth/user/user.dao');
authRoutes.post('/super-admin/register/:id', companyDAO.addCompany)
authRoutes.post('/admin/register/:id', companyDAO.addCompany);
authRoutes.post('/employee/register/:id', userDAO.createUser);
// authRoutes.get('/login', loginController.login);

exports.authRoutes = authRoutes;
