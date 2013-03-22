var producer = require('./producer.js'),
    filter = require('./filter.js');

producer.echo()
  .pipe(filter.ln(function (ln) {
    return ln.split('').reverse().join('');
  }))
  .pipe(process.stdout);
