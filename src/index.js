const bcrypt = require('bcrypt')
const {promisify} = require('util')

const hashP = promisify(bcrypt.hash)
const compareP = promisify(bcrypt.compare)
const genSaltP = promisify(bcrypt.genSalt)

const digest = 'bcrypt'

const OPTIONS = {
  saltRounds: 10
}

const hash = (password, salt, opts) => {
  if (typeof salt === 'object') {
    opts = salt
    salt = undefined
  }
  const { saltRounds } = Object.assign({}, OPTIONS, opts)

  return Promise.resolve()
    .then(() => salt || genSaltP(saltRounds)
    )
    .then(salt =>
      hashP(password, salt)
    )
    .then(hash => digest + hash)
}

const compare = (password, passwordHash) => {
  return compareP(password, passwordHash.substr(digest.length))
}

module.exports = {
  hash,
  compare,
  genSalt: genSaltP
}
