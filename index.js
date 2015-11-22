module.exports = emitter

// Emitter([constructor:Function(emit:Function(args...))]) -> emitter:Function
function emitter(constructor) {
  if("function" == typeof constructor) {
    constructor(emit)
  }else{
    constructor = null
  }
  
  var listeners = []
  
  return function (listener) {
    // emitter(listener:Function) -> removeListener:Function
    if(arguments.length == 1 && "function" == typeof listener) {
      var newLength = listeners.push(listener)
        , index = newLength-1
        , removed = false
      
      return function removeListener() {
        if(removed) return
        removed = true
        listeners.splice(index, 1)
      }
    }
    
    // emitter(args...)
    if(constructor) throw new Error('Emitting an event is private for this atomic-emitter')
    emit.apply(null, arguments)
  }
  
  function emit() {
    // emitter(args...)
    var args = arguments
    listeners.forEach(function(listener) {
      listener.apply(null, args)
    })
  }
}