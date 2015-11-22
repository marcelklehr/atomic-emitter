# atomic-emitter
Inspired by [geval](https://github.com/Raynos/geval).

# Example
`atomic-emitter` has an interface similar to geval's SingleEvent. You can pass it around, add listeners and produce events.

```js
var Emitter = require("atomic-emitter")

var clicksEmitter = Emitter()

var removeListener = clicksEmitter(function listener(ev) {
    console.log('click happened', ev)
})

document.addEventListener("click", function (ev) {
    clicksEmitter(ev)
})

// ...

removeListener() // and you will stop listening to events
```

Of course, you can also restrict write access to the creator of the emitter, if you want:

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