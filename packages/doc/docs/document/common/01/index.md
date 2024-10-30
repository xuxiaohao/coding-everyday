# 二次封装组件如何暴漏子组件的方法

- 通过 `$attrs` 透传属性
- 通过`new Proxy()` 暴露代理对象实现。
- 透传插槽
  ```vue
  <template v-for="(_, slot) in $slots" :key="slot" #[slot]="slotProp">
      <!-- slotProp可能为空，因此这里需要做下容错 -->
      <slot :name="slot" v-bind="slotProp || {}"></slot>
  </template>
  ```

:::demo:::

::: code-group
<<<./Demo.vue
<<<./MyInput.vue

:::