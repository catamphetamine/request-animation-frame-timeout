import { setTimeout, clearTimeout } from './index.js'

describe('setTimeout/clearTimeout', () => {
	it('should setTimeout/clearTimeout', () => {
		let triggered = false

		const timerId = setTimeout(() => {
			triggered = true
		}, 0)

		clearTimeout(timerId)

		setTimeout(() => {
			if (triggered !== false) {
				throw new Error('The timer shouldn\'t have been triggered')
			}
		}, 100)
	})
})