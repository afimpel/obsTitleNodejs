let socket = io();
let pompadour = document.querySelector('#pompadour');
let titleText = document.querySelector('#titleText');
let pretitleText = document.querySelector('#pretitleText');
let titleChecked = document.querySelector('#titleChecked');
let liveChecked = document.querySelector('#liveChecked');
let logoChecked = document.querySelector('#logoChecked');
let clockChecked = document.querySelector('#clockChecked');
let titleBox = document.querySelector('#titleBox');
let feedback = document.querySelector('#feedback');
let __dataemit__ = [...document.querySelectorAll('.dataemit')];

let btn = document.querySelector('#send');
let output = document.querySelector('#output');

titleChecked.addEventListener('click', env => {
  if (!titleChecked.checked) {
    titleBox.classList.add('hide');
    socket.emit('titleChecked', false);
  } else {
    titleBox.classList.remove('hide');
  }
});

clockChecked.addEventListener('click', env => {
  socket.emit('clockChecked', clockChecked.checked);
});

liveChecked.addEventListener('click', env => {
  socket.emit('liveChecked', liveChecked.checked);
});

logoChecked.addEventListener('click', env => {
  socket.emit('logoChecked', logoChecked.checked);
});

document.querySelectorAll('#color').forEach(elem => {
  elem.addEventListener('change', event => {
    var item = event.target.value;
    socket.emit('colorChange', item);
  });
});

btn.addEventListener('click', env => {
  let dataemit = {};
  let radioName = '';
  let radioValue = '';
  let datasend = __dataemit__.map(x => {
    switch (x.type) {
      case 'checkbox':
        dataemit[x.id] = x.checked;
        break;
      case 'radio':
        radioName = x.checked ? x.id : radioName;
        radioValue = x.checked ? x.value : radioValue;
        break;
      default:
        dataemit[x.id] = x.value;
    }

    return {
      value: x.value,
      name: x.name,
      id: x.id,
      className: x.className,
      type: x.type,
      checked: x.checked,
      obj: x,
    };
  });
  dataemit[radioName] = radioValue;
  socket.emit('titleChecked', true);

  socket.emit('master', {
    ...dataemit,
    datasend,
    dataemit,
  });
});

socket.on('master', data => {
  output.innerHTML +=
    '<p>pretitle: ' +
    data.pretitleText +
    '<br>title: ' +
    data.titleText +
    '<br>pompadour: ' +
    data.pompadour +
    '</p>';
  feedback.innerHTML = '';
});
