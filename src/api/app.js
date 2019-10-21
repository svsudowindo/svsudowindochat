var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var authRoutes = require('./routes/auth-routes');

var APP_CONFIG = require('./config/app.config');
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/auth', authRoutes.authRoutes);

mongoose.connect('mongodb://localhost:27017/svsudowindo', { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
  app.listen(APP_CONFIG.PORT, () => {
    console.log('listening', APP_CONFIG.PORT);
  })
})
