let socket = io();
let grafMaster = document.querySelector('#grafMaster');
let pretitleText = document.querySelector('#pretitleText');
let title = document.querySelector('#title');
let pompadour = document.querySelector('#pompadour');
let live = document.querySelector('#live');
let logo = document.querySelector('#logo');
let subContainerGraf = document.querySelector('#subContainerGraf');
let intervals;

socket.on('master', data => {
  pretitleText.innerHTML = data.pretitleText;
  if (data.titleText.length < 1) {
    title.classList.add('hide');
  } else {
    title.classList.remove('hide');
  }
  title.innerHTML = data.titleText;
  pompadour.innerHTML = data.pompadour;
});

socket.on('titleChecked', data => {
  if (!data) {
    grafMaster.classList.add('hide');
  } else {
    grafMaster.classList.remove('hide');
  }
});

socket.on('liveChecked', data => {
  if (!data) {
    live.classList.add('hide');
  } else {
    live.classList.remove('hide');
  }
});
socket.on('logoChecked', data => {
  if (!data) {
    logo.classList.remove('logoNormal');
    logo.classList.add('logoOff');
  } else {
    logo.classList.add('logoNormal');
    logo.classList.remove('logoOff');
  }
});

socket.on('colorChange', data => {
  subContainerGraf.className = data;
});

socket.on('clockChecked', data => {
  if (data) {
    document.getElementById('digital-clock').classList.remove('hide');
    intervals = setInterval(function () {
      currentTime = getDateTime();
      document.getElementById('digital-clock').innerHTML = currentTime;
    }, 1000);
  } else {
    document.getElementById('digital-clock').classList.add('hide');
    clearInterval(intervals);
  }
});

function getDateTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  if (month.toString().length == 1) {
    month = '0' + month;
  }
  if (day.toString().length == 1) {
    day = '0' + day;
  }
  if (hour.toString().length == 1) {
    hour = '0' + hour;
  }
  if (minute.toString().length == 1) {
    minute = '0' + minute;
  }
  if (second.toString().length == 1) {
    second = '0' + second;
  }
  var dateTime =
    day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
  return dateTime;
}
