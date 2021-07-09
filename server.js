const express = require('express');
const app = express();
const socket = require('socket.io');
const fs = require('fs');
const nocache = require('nocache');

const port = 9090;
let server = app.listen(port, function () {
  console.log('listening on ', port);
});

app.use(nocache());

app.use(express.static('public'));

let io = socket(server);

filePath = __dirname + '/json/graf.json';
filePathChecked = __dirname + '/json/checked.json';
const jsonApend = (filePath, dataJson) => {
  fs.readFile(filePath, (err, datafs) => {
    var json = JSON.parse(datafs);
    if (dataJson == true) {
      json = {};
    } else {
      dataJson.forEach(element => {
        if (element.once) {
          json[element.child] = element.value;
        } else {
          if (json[element.child]) {
            json[element.child].push(element.value);
          } else {
            json[element.child] = [element.value];
          }
        }
      });
    }
    fs.writeFile(filePath, JSON.stringify(json, null, ' '), function (err) {
      if (err) throw console.error('err :>> ', err);
    });
  });
};
fs.writeFile(filePath, '{}', function (err) {
  if (err) throw console.error('err :>> ', err);
});
fs.writeFile(filePathChecked, '{}', function (err) {
  if (err) throw console.error('err :>> ', err);
});
io.on('connection', function (socket) {
  console.log('someone connected');

  socket.on('master', function (data) {
    jsonApend(filePath, [
      {child: 'dataemit', value: data.dataemit},
      {child: 'datasend', value: data.datasend},
    ]);
    io.sockets.emit('master', data);
  });

  socket.on('titleChecked', function (checked) {
    jsonApend(filePathChecked, [
      {child: 'titleChecked', value: checked, once: true},
    ]);
    console.log('checked: titleChecked :>> ', checked);
    socket.broadcast.emit('titleChecked', checked);
  });

  socket.on('liveChecked', function (checked) {
    jsonApend(filePathChecked, [
      {child: 'liveChecked', value: checked, once: true},
    ]);
    console.log('checked: liveChecked :>> ', checked);
    socket.broadcast.emit('liveChecked', checked);
  });
  socket.on('logoChecked', function (checked) {
    jsonApend(filePathChecked, [
      {child: 'logoChecked', value: checked, once: true},
    ]);
    console.log('checked: logoChecked :>> ', checked);
    socket.broadcast.emit('logoChecked', checked);
  });

  socket.on('colorChange', function (checked) {
    jsonApend(filePathChecked, [
      {child: 'colorChange', value: checked, once: true},
    ]);
    console.log('change: colorChange :>> ', checked);
    socket.broadcast.emit('colorChange', checked);
  });
  socket.on('clockChecked', function (checked) {
    jsonApend(filePathChecked, [
      {child: 'clockChecked', value: checked, once: true},
    ]);
    console.log('checked: clockChecked :>> ', checked);
    socket.broadcast.emit('clockChecked', checked);
  });

  socket.on('disconnect', function () {
    console.log('someone disconnected');
  });
});
