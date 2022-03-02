let socket = io();
let pompadour = document.querySelector('#pompadour');
let titleText = document.querySelector('#titleText');
let pretitleText = document.querySelector('#pretitleText');
let titleChecked = document.querySelector('#titleChecked');
let socialChecked = document.querySelector('#socialChecked');
let liveChecked = document.querySelector('#liveChecked');
let logoChecked = document.querySelector('#logoChecked');
let clockChecked = document.querySelector('#clockChecked');
let titleBox = document.querySelector('#titleBox');
let socialBox = document.querySelector('#socialBox');
let socialGroup = document.querySelector('#socialGroup');
let feedback = document.querySelector('#feedback');
let palette = document.querySelector('.fa-palette');
let gridSocial = document.querySelectorAll('.gridSocial');
let soc001 = document.querySelector('#soc001');
let __dataemit__ = [...document.querySelectorAll('.dataemit')];
let preClass = 'green';
let soc = 1;

let btn = document.querySelector('#send');
let sendSocial = document.querySelector('#sendSocial');
let output = document.querySelector('#output');

titleChecked.addEventListener('click', env => {
  if (!titleChecked.checked) {
    titleBox.classList.add('hide');
    socket.emit('titleChecked', false);
  } else {
    titleBox.classList.remove('hide');
  }
});

socialChecked.addEventListener('click', env => {
  if (!socialChecked.checked) {
    socialBox.classList.add('hide');
    socket.emit('socialChecked', false);
  } else {
    socket.emit('socialChecked', true);
    socialBox.classList.remove('hide');
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
    palette.classList.remove(preClass);
    palette.classList.add(item);
    preClass = item;
    socket.emit('colorChange', item);
  });
});

document.querySelector('#addSocial').addEventListener('click', env => {
  //socket.emit('logoChecked', logoChecked.checked);
  let elemClon = soc001.cloneNode(true);
  soc++;
  elemClon.id = 'soc00' + soc;
  socialGroup.append(elemClon);
});

socialGroup.addEventListener('change', event => {
    document.querySelector('#'+event.path[1].id).querySelector('#socialIconsFa').className = event.target.value;
  });
  // p_prime = p.cloneNode(true);

btn.addEventListener('click', env => {
  let dataemit = {};
  let ls = true;
  __dataemit__.map(x => {
    dataemit[x.id] = x.value;
    if(x.value === "" && x.id === "pompadourText"){
      ls = false;
    }
    x.value = '';
  });
  if(ls){
    socket.emit('titleChecked', true);

    socket.emit('grafMaster', {
      ...dataemit,
    });  
  }else{
    output.innerHTML="Titulo: Debe completar la bajada..."
  }
});

sendSocial.addEventListener('click', env => {
  let __socialemit__ = [...document.querySelectorAll('.socialemit')];
  let socialemit = [];
  let vuelta = 0;
  __socialemit__.map((x,i) => {
    if(i%2===0){
      let obj = { name: "", icons: x.value }; 
      socialemit.push(obj);
    }else{
      socialemit[vuelta].name = x.value;
      vuelta++;
    }
  });
  socket.emit('socialData', socialemit);
  socialBox.classList.add('hide');
});

socket.onAny((eventName, data) => {
  output.innerHTML = eventName + ': ' + JSON.stringify(data, null, ' ');
});
