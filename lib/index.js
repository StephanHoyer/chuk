var repl = require('repl');

var env = 'foo';

chukRepl = repl.start({
  prompt: "chuk > ",
  input: process.stdin,
  output: process.stdout
}).on('exit', function() {
  console.log('Exit');
})

chukRepl.bufferedCommand = "require('./example/chukfile.js')." + env + "(global);";
