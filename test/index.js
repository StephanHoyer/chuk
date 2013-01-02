var chuk      = require('../')
  , fs        = require('fs')
  , pathextra = require('path-extra')
  , testutil  = require('testutil')
  , repl
  , config = {
  'foo': function(context) {
    context.foo = 'baz';
  },
  'bar': function(context) {
    context.bar = 123;
  },
  'default': function(context) {
    context.foo = 'default';
  }
};

describe('chuk', function() {
  it('should load chukfile configuration if it\'s a function', function() {
    repl = chuk(null, function(context) {
      context.foo = 'bar';
    });
    repl.context.global.should.have.property('foo');
    repl.context.global.foo.should.equal('bar');
  });

  it('should load chukfile configuration for given env', function() {
    repl = chuk('foo', config);
    repl.context.global.should.have.property('foo');
    repl.context.global.should.not.have.property('bar');
    repl.context.global.foo.should.equal('baz');
    repl = chuk('bar', config);
    repl.context.global.should.not.have.property('foo');
    repl.context.global.should.have.property('bar');
    repl.context.global.bar.should.equal(123);
  });

  it('should load default configuration if no env given', function() {
    repl = chuk(null, config);
    repl.context.global.should.have.property('foo');
    repl.context.global.should.not.have.property('bar');
    repl.context.global.foo.should.equal('default');
  });

  it('should write to default history file', function() {
    var command = 'var i = 1;'
      , DIR     = testutil.createTempDir()
      , path    = process.env.REPL_HISTORY = pathextra.join(DIR, '.repl_history');

    repl = chuk(null, config);
    repl.rli.emit('line', command);
    fs.existsSync(path).should.be.true;
    fs.readFileSync(path, 'utf-8').should.include(command);
    fs.unlink(path);
  });

  it('should use specified file if REPL_HISTORY is set', function() {
    var command = 'var f = function() { return true };'
      , path    = '.custom_history';

    process.env.REPL_HISTORY = path;
    repl = chuk(null, config);
    repl.rli.emit('line', command);
    fs.existsSync(path).should.be.true;
    fs.readFileSync(path, 'utf-8').should.include(command);
    process.env.REPL_HISTORY = undefined;
  });
});
