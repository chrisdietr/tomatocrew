Date.prototype.clockFormat = function () {
  var pad2 = function(n) {
    n += '';
    return n.length > 1 ? n : '0' + n;
  }
  return pad2(this.getUTCHours()) + ":" + pad2(this.getUTCMinutes()) + ":" + pad2(this.getUTCSeconds());
}