var express = require('express');
var authRoutes = express.Router();

var loginController = require('../controllers/login/login.dao');

authRoutes.get('/login', loginController.login);

exports.authRoutes = authRoutes;
