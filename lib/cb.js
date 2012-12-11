function init(context) {
  return function cb() {
    var i, key;
    for (i=0; i<arguments.length; i++) {
      key = '_' + i;
      context[key] = arguments[i];
      console.log(key + ' = ' + global[key]); 
    }
  }
}

module.exports = init;
