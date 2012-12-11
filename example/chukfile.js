module.exports = {
  'foo': function(scope) {
    scope.foo = 1;
    console.log('foo');
  },

  'bar': function(scope) {
    scope.bar = 1;
    console.log('bar');
  },

  'default': function(scope) {
    scope.default = 1;
    console.log('default');
  }
};
