# chuk

Run any arbitrary code before REPL starts

# Installation

```bash
$ npm install chuk -g
```

# Usage

If you've install *chuk* globaly as recommended you should be able to run the
chuk repl by just typing `chuk` instead of `node`. This should start a normal
REPL as you'd expect.

Now if you want to use the special ability to run some code before the REPL is
going up create a file called `Chukfile` in you projects root dir.

The simplest Chukfile may look like this:

  module.exports = function(scope) {
    scope.a = 1;
  }

As you can see, it contains just JavaScript code. This Chukfile simply exports
one function with one parameter. The function is called at the startup of the
REPL and the parameter is filled with the *global*-object of the REPL. So
the file above should give you a variable `a = 1` from start on.

## Advanced usage



# Running the tests

```bash
$ npm install
$ make test
```

# License

(The MIT License)

Copyright (c) 2012 Mario Behrendt info@mario-behrendt.de, Stephan Hoyer <ste.hoyer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
