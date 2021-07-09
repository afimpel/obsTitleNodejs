const express = require('express');
const app = express();
const socket = require('socket.io');
const nocache = require('nocache');

const port = 9090;
let server = app.listen(port, function () {
  console.log('listening on ', port);
});

app.use(nocache());

app.use(express.static('public'));

let io = socket(server);

io.on('connection', function (socket) {
  console.log('someone connected');

  socket.on('master', function (data) {
    io.sockets.emit('master', data);
  });

  socket.on('titleChecked', function (checked) {
    console.log('checked: titleChecked :>> ', checked);
    socket.broadcast.emit('titleChecked', checked);
  });

  socket.on('liveChecked', function (checked) {
    console.log('checked: liveChecked :>> ', checked);
    socket.broadcast.emit('liveChecked', checked);
  });
  socket.on('logoChecked', function (checked) {
    console.log('checked: logoChecked :>> ', checked);
    socket.broadcast.emit('logoChecked', checked);
  });

  socket.on('colorChange', function (checked) {
    console.log('change: colorChange :>> ', checked);
    socket.broadcast.emit('colorChange', checked);
  });
  socket.on('clockChecked', function (checked) {
    console.log('checked: clockChecked :>> ', checked);
    socket.broadcast.emit('clockChecked', checked);
  });

  socket.on('disconnect', function () {
    console.log('someone disconnected');
  });
});
