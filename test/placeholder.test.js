var assert = require('assert')

var arr = [1, 2, 3]

describe('Array check indexes', function() {
  describe('#indexOf 4', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(arr.indexOf(4), -1)
    })
  })

  describe('#indexOf 3', function() {
    it('should return 2', function() {
      assert.equal(arr.indexOf(3), 2)
    })
  })

  describe('#indexOf 2', function() {
    it('should return 1', function() {
      assert.equal(arr.indexOf(2), 1)
    })
  })

  describe('#indexOf 1 - failing test', function() {
    it('should return 0', function() {
      assert.equal(arr.indexOf(1), 1)
    })
  })
})