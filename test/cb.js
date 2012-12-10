var gently = new (require('gently'));

var cb = require('../lib/cb');

describe('cb', function() {
  it('should add argument to global scope and log out to console', function(done) {
    gently.expect(console, 'log', function(thing) {
      thing.should.equal('_0 = foo');
      done();
    });
    cb('foo');
    global.should.have.property('_0');
    global._0.should.equal('foo');
  });

  it('should add all arguments to global scope', function() {
    gently.expect(console, 'log', 2);
    cb('foo', 'bar');
    global.should.have.property('_0');
    global._0.should.equal('foo');
    global.should.have.property('_1');
    global._1.should.equal('bar');
  });
});
