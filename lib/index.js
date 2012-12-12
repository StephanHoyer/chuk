var repl = require('repl');

var cwd = process.cwd();

function isFunction(thing) {
  return 'function' === typeof thing;
}

function createRepl() {
  return repl.start({
    prompt: "chuk > ",
         input: process.stdin,
         output: process.stdout
  }).on('exit', function() {
    console.log('Exit');
  });
}

function getInitFromConfig(env, config) {
  if (isFunction(config[env])) {
    // config is an object with property [env] which is a function 
    return config[env];
  } else if (isFunction(config['default']) && !env) {
    // config is an object with property 'default' which is a function 
    return config['default'];
  } else if (isFunction(config)) {
    // config is a function itself
    return config;
  }
}

function chuk(env, config) {
  var chukRepl = createRepl();
  var config = config || require(cwd + '/chukfile');
  var init = getInitFromConfig(env, config);
  init(chukRepl.context.global);
  return chukRepl;
};

module.exports = chuk;
