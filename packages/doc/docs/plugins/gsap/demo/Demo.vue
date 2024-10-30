<template>
  <div class="pane">
    <div ref="demo1" class="d demo1">to</div>
    <div ref="demo2" class="d demo2">from</div>
    <div ref="demo3" class="d demo3">fromTo</div>
  </div>
</template>
<script setup lang="ts">
import { gsap } from 'gsap'
import { onMounted, ref } from 'vue'
const demo1 = ref()
const demo2 = ref()
const demo3 = ref()
onMounted(() => {
  gsap.to(demo1.value, {
    x: 300,
    duration: 1,
    delay: 0,
    repeat: Infinity
  })
  gsap.from(demo2.value, {
    x: 300,
    duration: 2,
    delay: 0,
    repeat: Infinity
  })
  gsap.fromTo(
    demo3.value,
    {
      x: 0
    },
    {
      x: 300,
      duration: 3,
      delay: 0,
      repeat: Infinity
    }
  )
})
</script>
<style lang="less" scoped>
.pane {
  // height: 500px;
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
  background: red;
}
.demo2 {
  background: blue;
}
.demo3 {
  background: green;
}
</style>
