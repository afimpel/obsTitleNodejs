let socket = io();
let grafMaster = document.querySelector('#grafMaster');
let pretitleText = document.querySelector('#pretitleText');
let pretitleTextNO = document.querySelector("#pretitleTextNO");
let title = document.querySelector('#title');
let pompadourText = document.querySelector('#pompadourText');
let live = document.querySelector('#live');
let social = document.querySelector('#social');
let logo = document.querySelector('#logo');
let subContainerGraf = document.querySelector('#subContainerGraf');
let intervals;

function toogle(obj,estado) {
  if(estado){
    obj.add('visible');
    obj.remove('hidden');
  }else{
    obj.add('hidden');
    obj.remove('visible');
  }
}

socket.on('grafMaster', data => {
  pretitleText.innerHTML = data.pretitleText;
  if (data.pretitleText.length < 1) {
    pretitleTextNO.classList.remove('hide');
    pretitleText.classList.add('hide');
  } else {
    pretitleTextNO.classList.add('hide');
    pretitleText.classList.remove('hide');
  }
  if (data.titleText.length < 1) {
    title.classList.add('hide');
  } else {
    title.classList.remove('hide');
  }
  title.innerHTML = data.titleText;
  pompadourText.innerHTML = data.pompadourText;
});

socket.on("socialData",data =>{
  //<i class="fab fa-twitter"> <em>@afimpel</em></i>
  let data2 = data.map(x =>{
    let icons = document.createElement('i');
    icons.className = x.icons;
    icons.innerHTML = '<em>'+x.name+"</em>";
    return icons.outerHTML;
  })
  social.innerHTML= data2.join("|");
})


socket.on('titleChecked', data => {
  toogle(grafMaster.classList, data);
});

socket.on('liveChecked', data => {
  toogle(live.classList, data);
});
socket.on('socialChecked', data => {
  toogle(social.classList, data);
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
    intervals = setInterval(function () {
      currentTime = getDateTime();
      document.getElementById('digital-clock').innerHTML = currentTime;
    }, 1000);
  } else {
    clearInterval(intervals);
  }
  toogle(document.getElementById('digital-clock').classList, data);
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
