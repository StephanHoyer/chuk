var repl = require('repl');

var cwd = process.cwd();

function isFunction(thing) {
  return 'function' === typeof thing;
}

module.exports = function(env, config) {
  var chukRepl = repl.start({
    prompt: "chuk > ",
           input: process.stdin,
           output: process.stdout
  }).on('exit', function() {
    console.log('Exit');
  });

  var config = config || require(cwd + '/chukfile');
  var init = function() {};
  if (isFunction(config[env])) {
    init = config[env];
  } else if (isFunction(config['default']) && !env) {
    init = config['default'];
  } else if (isFunction(config)) {
    init = config;
  }
  init(chukRepl.context.global);
  return chukRepl;
};
