# vitepress MD模版扩展方法

想要扩展MD，需要依赖 vite 插件来实现。在查看 VueUse 的官方源码后，了解到了它内部是如何实现 Demo 的。

VueUse 中，有示例的方法包含以下几个文件
```
- index.md // 文档
- demo.vue // demo
- index.ts // 方法实现
```

## 实现插件 `markdownTransform`

1. 在 vitepress 配置文件 `config/index.ts` 中，有一个配置项 `vite` 是作为 `vite.config.ts` 配置的

2. `markdownTransform` 简单实现

实现一个md中自定义容器`demo`,它的功能是查找到当前文件夹目录下的 `Demo.vue` 文件，并将其替换自定义容器


::: code-group
<<< ../.vitepress/config/vite.config.mts {ts}
<<< ../.vitepress/config/plugins/markdownTransform.mts {ts}
<<< ./hoverLight/index.md {3} [demo.md]
:::

查看 [demo](/demo/hoverLight/)

::: warning
需要注意 md 的行开头不能有多余的空格，否则会解析为代码 `pre`。
:::

## 其他效果

如果要实现其他的效果，只需要修改 `transform()` 内的实现即可。

## References

<Bookmark>[VueUse 官网文档源码](https://github.com/vueuse/vueuse/blob/main/packages/.vitepress/plugins/markdownTransform.ts)</Bookmark>