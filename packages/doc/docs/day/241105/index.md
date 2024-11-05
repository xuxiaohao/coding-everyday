---
tags:[vueuse]
---

# createGlobalState

创建全局的响应式对象状态。


## 重点

通过`effectScope()`创建独立作用域，`initialized`标记状态。

```ts
// store.js
import { createGlobalState, useStorage } from '@xros/utils'

export const useGlobalState = createGlobalState(
  () => useStorage('vueuse-local-storage', 'initialValue'),
)


// component.js
import { useGlobalState } from './store'

const state = useGlobalState()

```


## 源码

:::code-group
<<< ../../../../utils/src/shared/createGlobalState/index.ts
:::

## References

<Bookmark>[createGlobalState](https://vueuse.nodejs.cn/shared/createGlobalState/#createglobalstate)</Bookmark>