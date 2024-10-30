<template>
  <div ref="elRef" :class="$style['title']">
    <p>这是一个</p>
    <p>炫酷的</p>
    <p>标题文字</p>
  </div>
</template>
<script setup lang="ts">
import { useAnimate } from './useAnimate'
const { elRef } = useAnimate({
  selector: 'p',
  duration: 50
})
</script>
<style lang="less" module>
.title {
  p {
    font-size: 42px;
    text-transform: uppercase;
    letter-spacing: normal;
    text-align: center;
    transform: rotate(-10deg);
  }
  span {
    opacity: 0;
    display: inline-block;
    text-shadow: 1px 1px #533d4a, 2px 2px #533d4a, 3px 3px #533d4a, 4px 4px #533d4a;
    transform: skew(-10deg);
    animation: move 1s cubic-bezier(0.42, 0, 0, 1.65) forwards var(--time);
  }
  p:nth-child(1) {
    color: red;
  }
  p:nth-child(2) {
    color: #f1c40e;
  }
  p:nth-child(3) {
    color: green;
  }
}

@keyframes move {
  from {
    opacity: 0;
    transform: skew(-10deg) translateY(300%);
  }
  to {
    opacity: 1;
    transform: skew(-10deg) translateY(0);
  }
}
</style>
