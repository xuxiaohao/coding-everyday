type JSTypeMap = {
  boolean: boolean
  string: string
  number: number
  object: object
  symbol: symbol
  undefined: undefined
  null: null
  bigint: bigint
}
type JSTypeNames = keyof JSTypeMap

type ArgsType<T extends JSTypeNames[]> = {
  [K in keyof T]: JSTypeMap[T[K]]
}

declare function addImpl<T extends JSTypeNames[]>(
  ...args: [...T, (...args: ArgsType<T>) => any]
): void

addImpl('boolean', 'string', 'number', (a, b, c) => {}) // a: boolean, b: string, c: number
