---
tags:[vueuse]
---

# makeDestructurable

这个方法能够使对象和数组同时可同构解构。让传入的对象支持`[]`解构。

正常对象没有迭代器属性`Symbol.iterator`，是无法进行迭代的，也就意味着不能使用`for of`, `[...obj]`解构。我们可以通过给对象添加`Symbol.iterator`属性来让对象可迭代。

```ts
import { makeDestructurable } from '@xros/utils'

const foo = { name: 'foo' }
const bar = 1024

const obj = makeDestructurable(
  { foo, bar } as const,
  [foo, bar] as const,
)

// 用法
let { foo, bar } = obj
let [foo, bar] = obj

```

:::code-group
<<< ../../../../utils/src/shared/makeDestructurable/index.ts
:::

## References

<Bookmark>[makeDestructurable](https://vueuse.nodejs.cn/shared/makeDestructurable/#makedestructurable)</Bookmark>