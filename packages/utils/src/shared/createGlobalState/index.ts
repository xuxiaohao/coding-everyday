import { effectScope } from 'vue'
import type { AnyFn } from '../utils'

export function createGlobalState<Fn extends AnyFn>(stateFactory: Fn): Fn {
  let initialized = false
  let state: any
  const scope = effectScope(true)

  return ((...args: any[]) => {
    if (!initialized) {
      state = scope.run(stateFactory(...args))!
      initialized = true
    }
    return state
  }) as Fn
}
