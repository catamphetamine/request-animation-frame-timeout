# `request-animation-frame-timeout`

## Rationale

For some weird reason, in Chrome, `setTimeout()` would lag up to a second (or more) behind. Turns out, Chrome developers have deprecated `setTimeout()` API entirely without asking anyone. Replacing `setTimeout()` with `requestAnimationFrame()` can work around that Chrome bug. The timer-freezing behavior of Chrome is inherently retarded, so this workaround wouldn't be required if they designed their corporate web browser properly.

* [Fix Chrome setTimeout throttling](https://github.com/bvaughn/react-virtualized/issues/722)
* [Issue 570845: setInterval and setTimeout stop during input when timer callbacks are expensive](https://bugs.chromium.org/p/chromium/issues/detail?id=570845)

## Use

```
npm install request-animation-frame-timeout --save
```

```js
import { setTimeout, clearTimeout } from 'request-animation-frame-timeout'
```

## Warning

`requestAnimationFrame()` doesn't get called when a web browser tab is not visible (minimized or in background). When a web page goes non-visible, all `requestAnimationFrame()` timers will be paused until the page is visible again. For this reason, `requestAnimationFrame()` timers should only be used for user-interface-related stuff (visual transitions, user input timers, etc).