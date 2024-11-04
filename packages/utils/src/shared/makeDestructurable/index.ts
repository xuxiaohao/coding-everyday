export function makeDestructurable<T extends Record<string, unknown>, K extends readonly any[]>(
  obj: T,
  arr: K
): T & K {
  if (typeof Symbol === 'function') {
    const clone = { ...obj }

    Object.defineProperty(clone, Symbol.iterator, {
      value: function* () {
        for (const v of arr) yield v
      },
      enumerable: false,
    })
    return clone as T & K
  }
  return Object.assign(obj, arr) as T & K
}
