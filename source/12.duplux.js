var Duplex = require('stream').Duplex;
var fs = require('fs');
var util = require('util');
//实现一个文件加密的功能
util.inherits(SecretStream, Duplex);
function SecretStream() {
  Duplex.call(this, {highWaterMark: 1});
}

SecretStream.prototype._read = function () {
}

SecretStream.prototype._write = function (data, encoding, callback) {
  console.log('_write');
  for (var i = 0; i < data.length; i++) {
    data[i] = 255 - data[i];
  }
  this.push(data);
  /*this.push(data);//表示完成
  this.push(null);*/
}

var secret = new SecretStream();
fs.createReadStream('./password.txt').pipe(secret).pipe(
  fs.createWriteStream('./password-secret.txt')
)

