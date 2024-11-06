<template>
  <NButton type="primary" :loading="loading" @click="click"> hello1 {{ userInfo }}</NButton>
</template>
<script setup lang="ts">
  import { computedAsync } from '@xros/utils'
  import { ref } from 'vue'
  import { NButton } from 'naive-ui'

  function click() {
    name.value += 'x'
  }

  const name = ref('jack')
  const loading = ref(false)
  const userInfo = computedAsync(
    async () => {
      // 加入监听
      console.log(name.value)

      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(name.value)
        }, 1000)
      })
    },
    '' // initial state
    // loading
  )
</script>
