var express = require('express');
var authRoutes = express.Router();

var loginDAO = require('../controllers/auth/login/login.dao');
var companyDAO = require('../controllers/auth/company/company.dao');
var forgotPasswordDAO = require('../controllers/auth/forgot-password/forgot-password.dao');

authRoutes.post('/register/:id', companyDAO.addCompany);
authRoutes.post('/login', loginDAO.login);
authRoutes.post('/forgot-password', forgotPasswordDAO.forgotPassword);

exports.authRoutes = authRoutes;
