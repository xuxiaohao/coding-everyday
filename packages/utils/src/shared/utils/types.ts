import type { Ref } from 'vue'

export type Fn = () => void

/**
 * Any function.
 */
export type AnyFn = (...args: any[]) => any

export type RemovableRef<T> = Omit<Ref<T>, 'value'> & {
  get value(): T
  set value(value: T | null | undefined)
}
