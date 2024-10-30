<template>
  <div class="">
    <n-button @click="focus">聚焦</n-button>
    <MyInput v-model="msg" ref="myInputRef">
      <template #prefix> <span>前缀</span> </template>
      <template #suffix> <span>后缀</span> </template>
    </MyInput>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import MyInput from './MyInput.vue'
import * as pkg from 'naive-ui'
const { NButton } = pkg

const msg = ref('hello')
const myInputRef = ref()
function focus() {
  myInputRef.value.focus()
}
</script>
<style lang="less" module>
.demo {
  background: #161618;
  padding: 2em;
  position: relative;
  margin-bottom: 10px;
  border-radius: 8px;
  transition: background-color 0.5s;
}
</style>
