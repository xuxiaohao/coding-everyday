<template>
  <div class="pane">
    <div ref="demo1" class="d demo1"></div>
  </div>
</template>
<script setup lang="ts">
import { gsap } from 'gsap'
import { onMounted, ref } from 'vue'
const demo1 = ref()
onMounted(() => {
  const tl = gsap.timeline({
    repeat: Infinity,
    repeatDelay: 0.5
  })
  tl.to(demo1.value, {
    x: 300,
    duration: 0.5
  })
    .to(demo1.value, {
      y: 100
    })
    .to(demo1.value, {
      x: 0,
      y: 0
    })
})
</script>
<style lang="less" scoped>
.pane {
  height: 200px;
}
.d {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.demo1 {
  background: green;
}
</style>
