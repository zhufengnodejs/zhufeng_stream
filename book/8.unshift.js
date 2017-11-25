var offset = 0;
//分割新行的可读解析器:
//http://nodejs.cn/api/stream.html#stream_readable_unshift_chunk
process.stdin.on('readable', function () {
  var buf = process.stdin.read();//读取数据
  if (!buf) return;
  for (; offset < buf.length; offset++) {
    if (buf[offset] === 0x0a) {
      console.dir(buf.slice(0, offset).toString());
      buf = buf.slice(offset + 1);
      offset = 0;
      process.stdin.unshift(buf);
      return;
    }
  }
  process.stdin.unshift(buf);
});