var Readable = require('stream').Readable;

var rs = new Readable;
rs.push('beep ');
rs.push('boop\n');
rs.push(null);//告诉rs输出数据应该结束了

rs.pipe(process.stdout);