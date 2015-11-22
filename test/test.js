/* global xdescribe, describe, it, xit */
var Emitter = require('../')
  , expect = require('expect.js')

var END = {}

describe('atomic-emitter', function() {

  it('should emit events', function(done) {
    var emitter = Emitter()
      , values = [1,2,3]
      , result = []
    
    emitter(function(value) {
      result.push(value)
    })

    values.forEach(emitter.emit)

    setTimeout(function() {
      expect(result).to.eql(values)
      done()
    }, 0)
  })
  
  it('should remove the listener', function(done) {
    var emitter = Emitter()
      , values = [1,2,3,END, 4]
      , result = []
    
    var removeListener = emitter(function(value) {
      result.push(value)
      if(value === END) removeListener()
    })
    
    values.forEach(emitter.emit)

    setTimeout(function() {
      expect(result).to.eql([1,2,3,END])
      done()
    }, 0)
  })
  
  it('should restrict emit access', function(done) {
    var emit
    var emitter = Emitter(function(e) {
      emit = e
    })
    var values = [1,2,3]
      , result = []
    
    emitter(function(value) {
      result.push(value)
    })
    
    values.forEach(emit)
    
    expect(function () {
      emitter.emit(4)
    }).to.throwError()

    setTimeout(function() {
      expect(result).to.eql([1,2,3])
      done()
    }, 0)
  })

})