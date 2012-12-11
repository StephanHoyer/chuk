var repl = require('repl');

module.exports = function(env) {
  console.log(env);
  chukRepl = repl.start({
    prompt: "chuk > ",
           input: process.stdin,
           output: process.stdout
  }).on('exit', function() {
    console.log('Exit');
  })

  chukRepl.bufferedCommand = "require('./example/chukfile.js')." + env + "(global);";
  return chukRepl;
}
