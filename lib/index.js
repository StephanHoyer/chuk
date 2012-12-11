var repl = require('repl');

var cwd = process.cwd();

function isFunction(thing) {
  return 'function' === typeof thing;
}

module.exports = function(env) {
  chukRepl = repl.start({
    prompt: "chuk > ",
           input: process.stdin,
           output: process.stdout
  }).on('exit', function() {
    console.log('Exit');
  });

  var chukfile = require(cwd + '/chukfile.js');
  var init = function() {};
  if (isFunction(chukfile[env])) {
    init = chukfile[env];
  } else if (isFunction(chukfile['default']) && '' === env) {
    init = chukfile['default'];
  } else if (isFunction(chukfile)) {
    init = chukfile;
  }
  init(chukRepl.context.global);
  return chukRepl;
};
