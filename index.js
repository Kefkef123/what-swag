var asar = require('asar');
var fs = require('fs');

var path = process.platform == 'darwin' ? '/Applications/WhatsApp.app/Contents/Resources/app.asar' : process.env.LOCALAPPDATA + '\\WhatsApp\\app-0.2.684\\resources\\app.asar';
var basePath = path.split('.asar')[0];

fs.access(path, function(err) {
  if (err) {
    console.log('No file found in specified path');
    return;
  } else {
    if (path.indexOf('.asar') === -1) {
      console.log('Path does not contain a asar file');
      return;
    } else {
      console.log('extracting asar file');
      asar.extractAll(path, basePath);
      console.log('finished extracting asar file, installing swag');
      installSwag();
      console.log('finished installing swag');
    }
  }
});

var installSwag = function () {
  console.log('swagging the images');
  fs.renameSync(__dirname + '/9466a20e6d2921a21ac7ab82419be157.jpg', basePath + '/img/9466a20e6d2921a21ac7ab82419be157.jpg');
  fs.renameSync(__dirname + '/c98cc75f2aa905314d74375a975d2cf2.jpg', basePath + '/img/c98cc75f2aa905314d74375a975d2cf2.jpg');
  console.log('images swegged');

  console.log('swagging the intro text');
  fs.readFile(basePath + '/main.js', 'utf8', mainText);
  fs.readFile(basePath + '/locales/nl.js', 'utf8', translateText);

  console.log('swagging the app title');
  fs.readFile(basePath + '/electron_main.js', 'utf-8', titleText);
};

var mainText = function (err, data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/intro-connection/g, 'ntro-connection');
  result = result.replace(/Keep your phone connected/g, 'Welkom bij WhatSwag');
  result = result.replace(/WhatsApp Web connects to your phone to sync messages. To reduce data usage, connect your phone to Wi-Fi./g, 'Jij denkt deze petje is nep??');

  fs.writeFile(basePath + '/main.js', result, 'utf8', function (err) {
    console.log('tekst gedaan');
     if (err) return console.log(err);
  });
};

var titleText = function (err, data) {
  if (err) {
    return console.log(err);
  }

  var result = data.replace(/WhatsApp/g, 'WhatSwag');

  fs.writeFile(basePath + '/electron_main.js', result, 'utf-8', function(err){
    console.log('titel gedaan');
    if (err) return console.log(err);
  });
};

var translateText = function (err, data) {
  if (err) {
    return console.log(err);
  }

  var result = data.replace(/Zorg ervoor dat uw telefoon verbonden blijft/g, 'Welkom bij WhatSwag');
  result = result.replace(/WhatsApp Web maakt verbinding met uw telefoon om berichten te synchroniseren. Verbind uw telefoon met Wi-Fi om minder data te verbruiken./g, 'Jij denkt deze petje is nep??');

  fs.writeFile(basePath + '/locales/nl.js', result, 'utf8', function (err) {
    console.log('tekst gedaan');
     if (err) return console.log(err);
  });
};
