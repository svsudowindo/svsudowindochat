var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var cors = require('cors');

var authRoutes = require('./routes/auth-routes');

var adminRoutes = require('./routes/admin-routes');

var APP_CONFIG = require('./common/config/app.config');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/auth', authRoutes.authRoutes);
app.use('/admin', adminRoutes.adminRoutes);

mongoose.connect('mongodb://localhost:27017/svsudowindo', { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
  app.listen(APP_CONFIG.PORT, () => {
    console.log('listening', APP_CONFIG.PORT);
  })
})
