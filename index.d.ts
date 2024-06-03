export function setTimeout<TimeoutId = number>(callback: Function, delay: number): TimeoutId
export function clearTimeout<TimeoutId = number>(timeoutId: TimeoutId): void
