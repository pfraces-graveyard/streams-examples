var Stream = require('stream');

var produceData = function (data) {
  var s = new Stream;
  s.readable = true;

  process.nextTick(function () {
    s.emit('data', data);
    s.emit('end');
  });

  return s;
};

var produceLine = function (line) {
  return produceData(line + '\n');
};

var produceEcho = function () {
  return process.stdin;
};

var produceJSON = function (obj) {
  return produceLine(JSON.stringify(obj));
};

module.exports = {
  data: produceData,
  ln: produceLine,
  echo: produceEcho,
  json: produceJSON
};
