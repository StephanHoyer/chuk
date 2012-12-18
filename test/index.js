var chuk = require('../')
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
    var repl = chuk(null, function(context) {
      context.foo = 'bar';
    });
    repl.context.global.should.have.property('foo');
    repl.context.global.foo.should.equal('bar');
  });
  it('should load chukfile configuration for given env', function() {
    var repl = chuk('foo', config);
    repl.context.global.should.have.property('foo');
    repl.context.global.should.not.have.property('bar');
    repl.context.global.foo.should.equal('baz');
    repl = chuk('bar', config);
    repl.context.global.should.not.have.property('foo');
    repl.context.global.should.have.property('bar');
    repl.context.global.bar.should.equal(123);
  });
  it('should load default configuration if no env given', function() {
    var repl = chuk(null, config);
    repl.context.global.should.have.property('foo');
    repl.context.global.should.not.have.property('bar');
    repl.context.global.foo.should.equal('default');
  });
});
