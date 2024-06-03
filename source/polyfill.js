// Since `raf` package doesn't provide an ES6 export, it had to be copy-posted here and changed to ES6.
// https://gitlab.com/catamphetamine/virtual-scroller/-/issues/40

// Source: https://github.com/chrisdickinson/raf/blob/master/index.js

const root = typeof window === 'undefined' ? global : window
const vendors = ['moz', 'webkit']
const suffix = 'AnimationFrame'

let raf = root['request' + suffix]
let caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for (let i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if (!raf || !caf) {
  let last = 0
  let id = 0
  const queue = []
	const frameDuration = 1000 / 60

  raf = function(callback) {
    if (queue.length === 0) {
      const _now = Date.now()
      const next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        const cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for (let i = 0; i < cp.length; i++) {
          if (!cp[i].cancelled) {
            try {
              cp[i].callback(last)
            } catch (e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

export function request(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}

export function cancel() {
  caf.apply(root, arguments)
}

// export function polyfill(object) {
//   if (!object) {
//     object = root;
//   }
//   object.requestAnimationFrame = raf
//   object.cancelAnimationFrame = caf
// }