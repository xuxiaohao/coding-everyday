# 实现Promise A+规范代码

## 介绍


Promise/A+规范是JavaScript Promise的实现标准，任何实现了该标准的Promise库都被视为是合法的，可以在任何环境中通用。浏览器原生的`Promise`类也是遵循该规范的一种实现的，标准只规定必须实现 `then` 方法，其他方法(如 `catch`,`finally`,`Promise.all`等)，都只是为了方便由实现库自己提供的，并不在标准内。

以下提供一种Promise A+规范实现的代码，仅供参考。

::: code-group
<<< ../../../../vue3/src/promise/index.ts
:::



## References

<Bookmark>[Promise A+官网](https://promisesaplus.com/)</Bookmark>

<Bookmark>[手把手写Promise](https://www.bilibili.com/video/BV19SmjY8EFU?spm_id_from=333.788.videopod.sections&vd_source=4cbda134e5cc081b967e4c5190398150)</Bookmark>