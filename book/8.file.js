let fs = require('fs');

/*
let buf = new Buffer(64*1024+10);
buf.fill(1);
fs.writeFile('./8.txt',buf);*/


let rs = fs.createReadStream('8.txt');
var offset = 0;
//分割新行的可读解析器:
//http://nodejs.cn/api/stream.html#stream_readable_unshift_chunk
rs.on('readable', function () {
  var buf = rs.read();
  if (!buf) return;
  for (; offset < buf.length; offset++) {
    if (buf[offset] === 0x0a) {
      console.dir(buf.slice(0, offset).toString());
      buf = buf.slice(offset + 1);
      offset = 0;
      rs.unshift(buf);
      return;
    }
  }
  rs.unshift(buf);
});
