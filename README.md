[![Build Status](https://travis-ci.org/StephanHoyer/chuk.png?branch=master)](https://travis-ci.org/StephanHoyer/chuk)

# chuk

Run any arbitrary code before REPL starts.

## Installation

```bash
$ npm install chuk -g
```

## Usage

If you've install *chuk* globaly as recommended you should be able to run the
chuk repl by just typing `chuk` instead of `node`. This should start a normal
REPL as you'd expect.

Now if you want to use the special ability to run some code before the REPL is
going up create a file called `Chukfile` in you projects root dir.

The simplest Chukfile may look like this:

```js
module.exports = function(scope) {
  scope.a = 1;
}
```

As you can see, it contains just JavaScript code. This Chukfile simply exports
one function with one parameter. The function is called at the startup of the
REPL and the parameter is filled with the *global*-object of the REPL. So
the file above should give you a variable `a = 1` from start on.

## Advanced usage

Sometimes you want to have different code run on different tasks. Maybe you
want to initialize the database if your debugging model code and you want to
initialize a rest service if you want to test something there. This can be
achived easily by extending the `Chukfile` like so:

```js
module.exports = {
  "db": function(scope) {
    // DB init goes here
  },
  "rest": function(scope) {
    // REST init goes here
  }
}
```

If you now type

```bash
$ chuk db
```

to your shell, only the db section is loaded.

## REPL history

`chuk` automatically writes entered commands into a history file, which is then used to populate the repl's history on next boot of `chuk`.
By default the file `.repl_history` within the current execution folder is used, but this can be changed by the setting the environment variable `REPL_HISTORY` like:

```bash
REPL_HISTORY='.custom_history' chuk
```

Using the env variable, one could maintain multiple separate history files within a single project for both writing and reading, which can be handy under special circumstances.

## Running the tests

```bash
$ npm install
$ make test
```

## Plugins

[chuk-cb](https://github.com/StephanHoyer/chuk-cb) - simplifys writing callbacks in REPL session

## License

(The MIT License)

Copyright (c) 2012 Mario Behrendt info@mario-behrendt.de, Stephan Hoyer <ste.hoyer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
