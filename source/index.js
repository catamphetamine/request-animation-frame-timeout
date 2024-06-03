import { request as requestAnimationFrame, cancel as cancelAnimationFrame } from './polyfill.js'

export function setTimeout(callback, delay) {
	let startedAt = Date.now()

	let animationFrame = requestAnimationFrame(tick)

	function tick() {
		if (Date.now() - startedAt >= delay) {
			callback()
		} else {
			animationFrame = requestAnimationFrame(tick)
		}
	}

	return {
		clear: () => cancelAnimationFrame(animationFrame)
	}
}

export function clearTimeout(timeout) {
	if (timeout) {
		timeout.clear()
	}
}