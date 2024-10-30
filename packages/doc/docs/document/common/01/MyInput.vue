<template>
  <div>
    <div>my input</div>
    <n-input ref="inputRef" v-bind="$attrs">
      <template v-for="(_, slot) in $slots" :key="slot" #[slot]="slotProp">
        <!-- slotProp可能为空，因此这里需要做下容错 -->
        <slot :name="slot" v-bind="slotProp || {}"></slot>
      </template>
    </n-input>
  </div>
</template>
<script setup lang="ts">
import * as pkg from 'naive-ui'
const { NInput, NButton } = pkg
import { ref } from 'vue'

const inputRef = ref()

// 暴露出一个新的代理对象
defineExpose(
  new Proxy(
    {},
    {
      get(target, key) {
        return inputRef.value?.[key]
      },
      // !必须声明has方法
      has(target, key) {
        return key in inputRef.value
      }
    }
  )
)
</script>
