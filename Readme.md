# Babel Resolver Plugin [![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url]

Resolve modules from any directory.

```javascript
import User from '../../models/User';
```
Becomes:

```javascript
import User from 'models/User';
```

## Usage

```
npm i babel-plugin-resolver --save
rm -rf ~/.babel.json
```

*In .babelrc:*

```json
{
  "presets": ["es2015"],
  "plugins": [["resolver", {"resolveDirs": ["src"]}]]
}
```

Given the directory structure:

```
/app
  .babelrc
  /src
    /models
      User.js
    /controllers
      User.js
```

*In app/controllers/User.js:*

```javascript
import UserModel from 'models/User';
// => resolves: "app/src/models/User.js"
```

This example uses [Babel 6](http://babeljs.io/).

**Note:** Run `rm -rf ~/.babel.json` if you're seeing errors.

**Note2:** This plugin is only called when you use `import`, not `require`.


## Resolving Multiple Directories

*In .babelrc:*

```json
{
  "presets": ["es2015"],
  "plugins": [["resolver", {"resolveDirs": ["src", "src/lib"]}]]
}
```

Given the directory structure:

```
/app
  .babelrc
  /src
    /models
      User.js
    /controllers
      User.js
    /lib
      utils.js
```

*In app/controllers/User.js:*

```javascript
import UserModel from 'models/User';
// => resolves: "app/src/models/User.js"
import utils from 'utils';
// => resolves: "app/src/lib/utils.js"
```

## Installation

```
npm i babel-plugin-resolver --save
rm -f ~/.babel.json
```

## Why not just set NODE_PATH?

While setting `NODE_PATH=app` is a perfectly valid solution, `babel-resolver` is more explicit and lets you avoid mucking around with environment variables.

## License

MIT

[npm-image]: https://badge.fury.io/js/babel-plugin-resolver.svg
[npm-url]: https://npmjs.org/package/babel-plugin-resolver
[travis-image]: https://travis-ci.org/jshanson7/babel-plugin-resolver.svg
[travis-url]: https://travis-ci.org/jshanson7/babel-plugin-resolver
[coveralls-image]: https://coveralls.io/repos/jshanson7/babel-plugin-resolver/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/github/jshanson7/babel-plugin-resolver?branch=master
