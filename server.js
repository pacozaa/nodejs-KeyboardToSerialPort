var keypress = require('keypress');
var SerialPort = require('serialport').SerialPort;

var serialPort = new SerialPort('COM7', {
  baudrate: 9600
});

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
  else{
    console.log(key.name);
    serialPort.write(key.name+'\n', function(err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
    });
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();

serialPort.on('open', function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
  });
  serialPort.write('ls\n', function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });
});
