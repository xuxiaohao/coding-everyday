---
tags: [CSS]
---

# 用CSS实现丝滑的标题动画

通过CSS3的`transition`属性，结合js代码，我们可以实现标题的动画效果。

1. 将文本处理成一个个由`span`包裹的字符。
2. 设置`span`的`transition`属性，实现动画效果。
3. 每个`span`的`transition-delay`属性通过css变量控制，设置不同字符的动画延迟。


:::demo:::

::: code-group
<<< ./Demo.vue
<<< ./useAnimate.ts
:::