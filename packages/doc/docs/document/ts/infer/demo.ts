// 推导返回值类型
type Return<T> = T extends (...args: any) => infer R ? R : T

type sum = (a: number, b: number) => number
let sunResult: Return<sum> // number

type concat = (a: any, b: any) => any[]
let concatResult: Return<concat> // any[]

// 推导第一个参数类型
type First<T> = T extends (arg: infer A, ...args: any[]) => any ? A : T

type sum1 = (a: number, b: number) => number
let firstArg: First<sum1> // number

// 推导promise返回值类型
type PromiseType<T> = T extends Promise<infer U> ? PromiseType<U> : T
type P1 = Promise<string>
let p: PromiseType<P1> // string
// 嵌套的promise
type P2 = PromiseType<Promise<Promise<string>>> // string
