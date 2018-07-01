/* eslint no-multi-spaces:0 */

const assert = require('assert')
const passwordHash = require('..')

describe('#passwordHash', function () {
  const hash           = 'bcrypt$2b$10$saltsaltsaltsaltsaltsOPRDjePxJkNp7mjBEve63IqKPFT7ehNG'
  const hashBadHash    = 'bcrypt$2b$10$saltsaltsaltsaltsaltsOPRDjePxJkNp7mjBEve63IqKPFT7ehNH'
  const hashBadSalt    = 'bcrypt$2b$10$saltSALTsaltsaltsaltsOPRDjePxJkNp7mjBEve63IqKPFT7ehNG'
  const hashBadIter    = 'bcrypt$2b$11$saltsaltsaltsaltsaltsOPRDjePxJkNp7mjBEve63IqKPFT7ehNG'
  const hashBadHashlen = 'bcrypt$2b$10$saltsaltsaltsaltsaltsOPRDjePxJkNp7mjBEve63IqKPFT7ehN'

  it('should hash password with given salt', function () {
    const salt = '$2b$10$saltsaltsaltsaltsaltsa'
    return passwordHash.hash('password', salt)
      .then((res) => {
        assert.equal(res, hash)
      })
  })

  it('should hash password with different options', function () {
    return passwordHash.hash('password', {saltRounds: 12})
      .then((hash) => {
        // console.log(hash)
        assert.ok(hash.indexOf('bcrypt$2b$12$') === 0)
        assert.ok(hash)
        assert.equal(hash.length, 66)
      })
  })

  it('should hash password using a fresh salt', function () {
    let hash
    return passwordHash.hash('password')
      .then((_hash) => {
        hash = _hash
        assert.ok(_hash)
        assert.ok(_hash.indexOf('bcrypt$2b$10$') === 0)
        assert.equal(_hash.length, 66)
        return passwordHash.hash('password')
      })
      .then((_hash) => {
        assert.ok(_hash)
        assert.ok(_hash !== hash)
      })
  })

  describe('should validate a hashed password', function () {
    it('good case', function () {
      return passwordHash.compare('password', hash)
        .then((res) => {
          assert.strictEqual(res, true)
        })
    })

    it('fails with wrong hash', function () {
      return passwordHash.compare('password', hashBadHash)
        .then((res) => {
          assert.strictEqual(res, false)
        })
    })

    it('fails with wrong salt', function () {
      return passwordHash.compare('password', hashBadSalt)
        .then((res) => {
          assert.strictEqual(res, false)
        })
    })

    it('fails with wrong iterations', function () {
      return passwordHash.compare('password', hashBadIter)
        .then((res) => {
          assert.strictEqual(res, false)
        })
    })

    it('fails with wrong hash length', function () {
      return passwordHash.compare('password', hashBadHashlen)
        .then((res) => {
          assert.strictEqual(res, false)
        })
    })
  })
})
