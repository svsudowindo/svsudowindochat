var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var cors = require('cors');
// const http = require('http').Server(app);
var authRoutes = require('./routes/auth-routes');

var adminRoutes = require('./routes/admin-routes');

var APP_CONFIG = require('./common/config/app.config');
app.use(cors());
// http.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4300");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/auth', authRoutes.authRoutes);
app.use('/admin', adminRoutes.adminRoutes);
var http = require('http').Server(app)
const io = require('socket.io')(http);
responseData = [];
io.on("connection", socket => {
  socket.on("init", (data) => {
    socket.join(data.obj.fromID + data.obj.toID);
    socket.join(data.obj.toID + data.obj.fromID);
    // socket.broadcast.to(data.obj.fromID + data.obj.toID).emit('receive', responseData);
    //   socket.broadcast.to(data.obj.toID + data.obj.fromID).emit('receive', responseData);
  })
  socket.on("send", (data) => {
    console.log(data.obj);
    responseData.push(data.obj);
    // socket.broadcast.to(data.obj.fromID + data.obj.toID).emit('receive', { message: data.obj.message, fromID: data.obj.fromID, toID: data.obj.toID });
    socket.broadcast.to(data.obj.toID + data.obj.fromID).emit('receive', responseData);
  })
})

mongoose.connect('mongodb://localhost:27017/svsudowindo', { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
  http.listen(APP_CONFIG.PORT, () => {
    console.log('listening', APP_CONFIG.PORT);
  })
})
