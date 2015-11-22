# atomic-emitter
Similar to [geval](https://github.com/Raynos/geval), but will proxy the whole arguments to listeners.

## Example
`atomic-emitter` has an interface similar to geval's SingleEvent. You can pass it around, add listeners and produce events.

```js
var Emitter = require("atomic-emitter")

var clicksEmitter = Emitter()

var removeListener = clicksEmitter(function listener(ev, time) {
    console.log('click happened', ev)
})

document.addEventListener("click", function (ev) {
    clicksEmitter(ev, +Date())
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

clicksEmitter({test: true}) // Will throw an exception

// ...

removeListener() // and you will stop listening to events
```

## Legal
(c) 2015 by Marcel Klehr  
MIT License