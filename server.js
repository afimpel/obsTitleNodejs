const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const open = require("open");
const port = process.env.PORT || 3000;
const sassMiddleware = require("node-sass-middleware");
const nocache = require('nocache');
app.use(nocache());

app.use(
  sassMiddleware({
    src: __dirname + "/scss", //where the sass files are
    dest: __dirname + "/public/css", //where css should go
    outputStyle: "compressed",
    prefix: "/css",
    debug: true, // obvious
  })
);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("[connected]\t", socket.handshake.headers.referer);

  socket.on("grafMaster", (msg) => {
    io.emit("grafMaster", msg);
  });
  socket.on("titleChecked", (msg) => {
    io.emit("titleChecked", msg);
  });
  socket.on("liveChecked", (msg) => {
    io.emit("liveChecked", msg);
  });
  socket.on("logoChecked", (msg) => {
    io.emit("logoChecked", msg);
  });
  socket.on("colorChange", (msg) => {
    io.emit("colorChange", msg);
  });
  socket.on("clockChecked", (msg) => {
    io.emit("clockChecked", msg);
  });
  socket.on('disconnect', function (e) {
    console.log("[disconnected]\t", socket.handshake.headers.referer);
  });

  socket.onAny((eventName, data) => {
    console.log("[" + eventName + "]\t", data);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
  open(`http://localhost:${port}/settings.html`);
});
