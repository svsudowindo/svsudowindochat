var express = require('express');
var authRoutes = express.Router();

var loginDAO = require('../controllers/auth/login/login.dao');
var companyDAO = require('../controllers/auth/company/company.dao');
authRoutes.post('/register/:id', companyDAO.addCompany);
authRoutes.post('/login', loginDAO.login);

exports.authRoutes = authRoutes;
