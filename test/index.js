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
    var repl1 = chuk('foo', config);
    repl1.context.global.should.have.property('foo');
    repl1.context.global.should.not.have.property('bar');
    repl1.context.global.foo.should.equal('baz');
    var repl2 = chuk('bar', config);
    repl2.context.global.should.not.have.property('foo');
    repl2.context.global.should.have.property('bar');
    repl2.context.global.bar.should.equal(123);
  });
  it('should load default configuration if no env given', function() {
    var repl = chuk(null, config);
    repl.context.global.should.have.property('foo');
    repl.context.global.should.not.have.property('bar');
    repl.context.global.foo.should.equal('default');
  });
});
