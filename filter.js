var Stream = require('stream'),
    buf;

var filterData = function (filter) {
  var s = new Stream;
  s.readable = true;
  s.writable = true;

  s.write = function (buf) {
    s.emit('data', filter(buf));
  };

  s.destroy = function () {
    s.writable = false;
    s.emit('end');
  };

  s.end = function (buf) {
    if (arguments.length) {
      s.write(buf);
    }

    s.destroy();
  };
  
  return s;
};

var filterRow = function (rowSeparator, filter) {
  return filterData(function (data) {
    var rows = data.toString().split(rowSeparator),
        r = buf || '';

    buf = rows.pop();

    rows.forEach(function (line) {
      r += filter(line) + rowSeparator;
    });

    return r;
  });
};

var filterLine = function (filter) {
  return filterRow('\n', function (row) {
    return filter(row.toString());
  });
};

module.exports = {
  data: filterData,
  rows: filterRow,
  ln: filterLine
};
