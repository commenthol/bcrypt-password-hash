# bcrypt-password-hash

> hash password with bcrypt

[![NPM version](https://badge.fury.io/js/bcrypt-password-hash.svg)](https://www.npmjs.com/package/bcrypt-password-hash/)

Generation and validation of passwords using bcrypt hashes.
Uses same api as [pbkdf2-password-hash](https://www.npmjs.com/package/pbkdf2-password-hash).

Requires node >= v8.0.0

## TOC

<!-- !toc (minlevel=2 omit="TOC") -->

* [Example](#example)
* [API](#api)
  * [`hash(password, [salt], [opts])`](#hashpassword-salt-opts)
  * [`compare(password, passwordHash)`](#comparepassword-passwordhash)
* [Installation](#installation)
* [Tests](#tests)
* [LICENSE](#license)

<!-- toc! -->

## Example

Generate new password hash

```js
const passwordHash = require('bcrypt-password-hash')

// generates random salt
passwordHash.hash('password')
  .then((hash) => {
    //> hash === 'bcrypt$2b$10$Y6MKD5ZI5gtkvBdYyqwr1.CrHA66ppM/9YNDvacUuqWZSVduKQcIq'
  })
```

Generate password hash with different options

```js
passwordHash.hash('password', {saltRounds: 14})
.then((hash) => {
  //> hash === 'bcrypt$2b$14$9zjobUQJ9LVswQrQJ7leKe6NnJKMc3ZouykkhZZ6uFa9ARMZVSUgy'
})
```

Validate password hash

```js
const hash = 'bcrypt$2b$14$9zjobUQJ9LVswQrQJ7leKe6NnJKMc3ZouykkhZZ6uFa9ARMZVSUgy'
passwordHash.compare('password', hash)
.then((isValid) => {
  //> isValid === true
})
```

## API

<a name="hashpassword-salt-opts"></a>
### `hash(password, [salt], [opts])`

Generate a new password hash for password using [bcrypt][].

**Parameters**

| parameter              | type   | description                      |
| ---------------------- | ------ | -------------------------------- |
| `password`             | String |                                  |
| `[salt]`               | String | _optional:_ salt                 |
| `[opts.saltRound=10]`  | Number | _optional:_ number of iterations |

**Returns** `Promise`, hashed password in `bcrypt$<version>$<saltRound>$<salt><hash>` notation.

<a name="comparepassword-passwordhash"></a>
### `compare(password, passwordHash)`

validate password against passwordHash

**Parameters**

| parameter      | type   | description         |
| -------------- | ------ | ------------------- |
| `password`     | String | plain-text password |
| `passwordHash` | String | hashed password     |

**Returns** `Promise`, true if hash matches password

## Installation

Requires [nodejs](http://nodejs.org/) >= v8.0.0

```sh
$ npm install --save bcrypt-password-hash
```

## Tests

```sh
$ npm test
```

## LICENSE

UNLICENSE <https://unlicense.org>

[bcrypt]: https://www.npmjs.com/package/bcrypt
