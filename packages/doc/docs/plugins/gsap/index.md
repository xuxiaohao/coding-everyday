# 动画工具GSAP

GSAP 是一个强大的 JavaScript 工具集，可以将开发人员变成动画超级英雄。构建适用于所有主流浏览器的高性能动画。动画化 CSS、SVG、Canvas、React、Vue、WebGL、颜色、字符串、运动路径、通用对象……任何 JavaScript 可以触及的东西！ GSAP 的 ScrollTrigger 插件可让您使用最少的代码创建令人惊叹的基于滚动的动画。

## 如何使用 

### 安装

1. GSAP动画：[greensock.com/showcase/](http://greensock.com/showcase/)
2. GSAP ScrollTrigger（gsap的插件）动画：[greensock.com/st-demos/](http://greensock.com/st-demos/)

``` bash
pnpm i gsap
```

### 基础API

```js
gsap.to(目标dom, { x: 300, y: 100, duration: 1, ease: 'back' })

gsap.from(目标dom, { x: 300, duration: 1, delay: 1 })

gsap.fromTo(目标dom, { x: 300, y: 100 }, { x: 100, y: 50 })
```

:::demo ./demo/Demo:::

::: code-group
<<< ./demo/Demo.vue{vue}
:::


### Timeline

:::demo ./demo/Demo2:::

::: code-group
<<< ./demo/Demo.vue
:::

## References

<Bookmark>[动画GSAP](https://juejin.cn/post/7224402365452910650?from=search-suggest)</Bookmark>
