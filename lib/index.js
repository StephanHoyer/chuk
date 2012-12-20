var fs  = require('fs')
  , cwd = process.cwd();

function isFunction(thing) {
  return 'function' === typeof thing;
}

function createRepl() {
  return require('repl').start({
    prompt: 'chuk > ',
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

function addHistory(repl) {
  var path = process.env.REPL_HISTORY || '.repl_history';

  // Load previous history from file if it already exists
  if (fs.existsSync(path)) {
    repl.rli.history = fs.readFileSync(path, 'utf-8').split('\n').reverse();

    // Reset last command, otherwise this would display an empty line
    repl.rli.history.shift();
  }

  // Attach history listener
  var handle = fs.openSync(path, 'a');
  repl.rli.addListener('line', function(command) {
    fs.write(handle, command + "\n");
  });

  // Close handle on exit
  process.on('exit', function() {
    fs.closeSync(handle);
  });
}

function chuk(env, config) {
  var chukRepl = createRepl();

  // Track and set repl history
  addHistory(chukRepl);

  // Load Chukfile
  config = config || require(cwd + '/Chukfile');
  var init = getInitFromConfig(env, config);
  init(chukRepl.context);

  return chukRepl;
}

module.exports = chuk;
