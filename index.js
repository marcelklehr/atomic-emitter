module.exports = Emitter

// Emitter([constructor:Function(emit:Function(args...))]) -> emitter:Function
function Emitter(constructor) {
  if("function" == typeof constructor) {
    constructor(emit)
  }else{
    constructor = null
  }
  
  var listeners = []

  // emitter(listener:Function) -> removeListener:Function
  // emitter() -> emitter:function
  var emitter = function (listener) {
    // emitter() -> emitter:function
    if(!listener) {
      return emitter
    }
    // emitter(listener:Function) -> removeListener:Function
    if("function" !== typeof listener) {
      throw new Error('Listener must be a function')
    }
    var newLength = listeners.push(listener)
      , index = newLength-1
      , removed = false
    
    return function removeListener() {
      if(removed) return
      removed = true
      listeners.splice(index, 1)
    }
  }
  
  if(!constructor) {
    // emitter.emit(args...)
    emitter.emit = emit
  }
  
  return emitter
  
  function emit() {
    var args = arguments
    listeners.forEach(function(listener) {
      listener.apply(null, args)
    })
  }
}