var gently = new (require('gently'))
  , cb = require('../lib/cb');

describe('cb', function() {
  it('should add argument to context scope and log out to console', function(done) {
    var context = {};
    gently.expect(console, 'log', function(thing) {
      thing.should.equal('_0 = foo');
      done();
    });
    cb(context)('foo');
    context.should.have.property('_0');
    context._0.should.equal('foo');
  });

  it('should add all arguments to context scope', function() {
    var context = {};
    gently.expect(console, 'log', 2);
    cb(context)('foo', 'bar');
    context.should.have.property('_0');
    context._0.should.equal('foo');
    context.should.have.property('_1');
    context._1.should.equal('bar');
  });
});
