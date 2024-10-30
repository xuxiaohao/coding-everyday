enum State {
  'pending',
  'fulfilled',
  'rejected',
}

/**
 * 放入微任务队列执行
 *
 * @param {*} cb
 */
function runMicroTask(cb: any) {
  if (typeof queueMicrotask === 'function') {
    queueMicrotask(cb)
  } else if (typeof process === 'object' && typeof process.nextTick === 'function') {
    process.nextTick(cb)
  } else if (typeof MutationObserver === 'function') {
    const text = document.createTextNode('')
    const observer = new MutationObserver(cb)
    observer.observe(text, { characterData: true })
    text.data = '1'
  } else {
    setTimeout(cb, 0)
  }
}

function isPromiseLike(val: any) {
  return val != null && typeof val === 'object' && typeof val.then === 'function'
}

class XPromise {
  #value: any
  #state: State = State.pending
  #handlers: any[] = []
  constructor(executer: (r: any, j: any) => void) {
    const resolve = (val: any) => {
      this.#setState(State.fulfilled, val)
    }

    const reject = (reason: any) => {
      this.#setState(State.rejected, reason)
    }

    try {
      executer(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  #setState(state: State, value: any) {
    if (this.#state !== State.pending) {
      return
    }
    this.#value = value
    this.#state = state
    this.#runTask()
  }

  #runTask() {
    runMicroTask(() => {
      if (this.#state === State.pending) {
        return
      }
      let task: any
      while ((task = this.#handlers.shift())) {
        task()
      }
    })
  }

  then(onFulfilled?: any, onRejected?: any) {
    return new XPromise((resolve, reject) => {
      this.#handlers.push(() => {
        try {
          const cb = this.#state === State.fulfilled ? onFulfilled : onRejected

          const res = typeof cb === 'function' ? cb(this.#value) : this.#value
          if (isPromiseLike(res)) {
            res.then(resolve, reject)
          } else {
            resolve(res)
          }
        } catch (e) {
          reject(e)
        }
      })

      this.#runTask()
    })
  }

  catch(onRejected: any) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally: any) {
    return this.then(
      (res: any) => {
        onFinally()
        return res
      },
      (error: any) => {
        onFinally()
        throw error
      }
    )
  }
}

export default XPromise

// 测试代码
const p = new XPromise((resolve, reject) => {
  console.log('start')

  resolve(1)
})
p.then(
  (res) => {
    console.log('第一个，success', res)
    return Promise.reject(2333)
  },
  (res) => {
    console.log('第一个, error', res)
  }
)
  .finally(() => {
    console.log('finally')
  })
  .catch((res) => {
    console.log('第2个, error', res)
    return 'ooo'
  })
  .then((res) => {
    console.log('第3个, success', res)
  })

console.log('end')
