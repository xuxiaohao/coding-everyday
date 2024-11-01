---
tags:[vueuse]
---

# computedAsync

实现`computed`的异步版本。

:::demo:::

::: code-group
<<< ./Demo.vue
<<< ../../../../utils/src/core/computedAsync/index.ts
:::

## 问题

### 子模块直接引用时别名问题

刚开始直接导入`@xros/utils`模块，由于模块没有经过编译，遇到`import { noop, type Fn } from '@/shared'` 别名时会报错。通过使用`vite` 的[库模式](https://vitejs.cn/vite5-cn/guide/build.html#library-mode) 对源码进行编译。

### 编译后的模块有问题,方法无法正常调用。

换成官方方法或者直接引用源码模块可以正常执行。

怀疑是打包出现问题，但未找到原因。最后通过将`vue-demi` 替换为 `vue`,再将`vue`模块外部化处理，解决了问题。



## References

<Bookmark>[computedAsync](https://vueuse.nodejs.cn/core/computedAsync/#computedasync)</Bookmark>