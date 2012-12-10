function cb() {
  var i, key;
  for (i=0; i<arguments.length; i++) {
    key = '_' + i;
    global[key] = arguments[i];
    console.log(key + ' = ' + global[key]); 
  }
}

module.exports = cb;
