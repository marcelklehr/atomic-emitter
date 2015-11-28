# atomic-emitter
Similar to [geval](https://github.com/Raynos/geval), with the following changes:

 * will proxy the whole arguments to listeners
 * will work in conjunction with [observ(able)](http://github-com/Raynos/observ) data structures.

## Example
`atomic-emitter` has an interface similar to geval's SingleEvent. You can pass it around, add listeners and emit events.

```js
var Emitter = require("atomic-emitter")

var clicksEmitter = Emitter()

var removeListener = clicksEmitter(function(ev, time) {
    console.log('click happened', ev)
})

document.addEventListener("click", function (ev) {
    clicksEmitter.emit(ev, +new Date())
})

// ...

removeListener() // and you will stop listening to events
```

You can also restrict write access to the creator of the emitter, if you want:

```js
var Emitter = require("atomic-emitter")

var clicksEmitter = Emitter(function (emit) {
    document.addEventListener("click", function (ev) {
        emit(ev)
    })
})

var removeListener = clicksEmitter(function listener(ev) {
    console.log('click happened', ev)
})

clicksEmitter.emit({test: true}) // Will throw an exception

// ...

removeListener() // and you will stop listening to events
```

The purpose of this is that you no longer have an EventEmitter-inherited object with obscure events, but a normal everyday-object with some of its properties populated with atomic emitters as values -- events are real values now. For example:

```js
var stream = {
  ondata: Emitter()
, onclose: Emitter()
}
```

## API
### Emitter(fn:Function(emit:Function)): Emitter
Create an atomic emitter with an emit function passed to the creating code.

### Emitter(): Emitter
Create an atomic emitter with a public emit function.

### emitter()
Returns the emitter itself.

### emitter.emit(args...)
Emit the event.

### emitter(listener:Function)
Add an event listener.

## Legal
(c) 2015 by Marcel Klehr  
MIT License