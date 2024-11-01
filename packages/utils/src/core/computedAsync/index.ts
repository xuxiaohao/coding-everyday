import { computed, isRef, ref, shallowRef, watchEffect, type Ref } from 'vue'
import { noop, type Fn } from '@/shared'

export type AsyncComputedOnCancel = (cancelCallback: Fn) => void

export interface AsyncComputedOptions {
  // 是否在第一次获取时执行
  lazy?: boolean
  // 追踪异步函数是否在执行中
  evaluating?: Ref<boolean>
  // 是否浅层响应shallowRef
  shallow?: boolean
  onError?: (e: unknown) => void
}

export function computedAsync<T>(
  evaluationCallback: (onCancel: AsyncComputedOnCancel) => T | Promise<T>,
  initialState: T,
  optionsOrRef?: Ref<boolean> | AsyncComputedOptions
): Ref<T>
export function computedAsync<T>(
  evaluationCallback: (onCancel: AsyncComputedOnCancel) => T | Promise<T>,
  initialState?: undefined,
  optionsOrRef?: Ref<boolean> | AsyncComputedOptions
): Ref<T | undefined>
export function computedAsync<T>(
  evaluationCallback: (onCancel: AsyncComputedOnCancel) => T | Promise<T>,
  initialState?: T,
  optionsOrRef?: Ref<boolean> | AsyncComputedOptions
): Ref<T> | Ref<T | undefined> {
  let options: AsyncComputedOptions
  if (isRef(optionsOrRef)) {
    options = {
      evaluating: optionsOrRef,
    }
  } else {
    options = optionsOrRef || {}
  }

  const { lazy = false, evaluating = undefined, shallow = true, onError = noop } = options

  const started = ref(!lazy)
  const current = (shallow ? shallowRef(initialState) : ref(initialState)) as Ref<T>
  let counter = 0

  watchEffect(async (onClearup) => {
    if (!started.value) {
      return
    }

    counter++
    const counterAtBeginning = counter
    let hasFinished = false

    if (evaluating) {
      // 微任务执行，为了不监听evaluating变化
      Promise.resolve().then(() => {
        evaluating.value = true
      })
    }

    try {
      const result = await evaluationCallback((cancelCallback) => {
        onClearup(() => {
          if (evaluating) {
            evaluating.value = false
          }
          if (!hasFinished) {
            cancelCallback()
          }
        })
      })
      if (counterAtBeginning === counter) {
        current.value = result as T
      }
    } catch (e) {
      onError(e)
    } finally {
      if (evaluating && counterAtBeginning === counter) {
        evaluating.value = false
      }
      hasFinished = true
    }
  })

  if (lazy) {
    return computed(() => {
      started.value = true
      return current.value
    })
  } else {
    return current
  }
}

export { computedAsync as asyncComputed }
