var express = require('express');
var authRoutes = express.Router();

var companyDAO = require('../controllers/auth/company/company.dao');
authRoutes.post('/register/:id', companyDAO.addCompany);
// authRoutes.get('/login', loginController.login);

exports.authRoutes = authRoutes;
