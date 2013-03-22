var filter = require('./filter.js'),
    request = require('request');

var i = 0;

request('http://translate.google.es/?hl=en&tab=wT#auto/en/casa')
  .pipe(filter.ln(function (ln) {
    return 'LINE ' + (++i).toString() + ': ' + ln.replace('home', '\n\n\n\nHOME\n\n\n\n');
  }))
  .pipe(process.stdout);
