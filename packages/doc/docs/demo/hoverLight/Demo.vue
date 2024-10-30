<template>
  <div class="container">
    <div class="item" ref="cardRef1"></div>
    <div class="item" ref="cardRef2"></div>
    <div class="item" ref="cardRef3"></div>
  </div>
</template>
<script setup lang="ts">
import { useLightCard } from './use-light-card.mjs'

const { cardRef: cardRef1 } = useLightCard()
const { cardRef: cardRef2 } = useLightCard({
  color: '#ffffff',
  blur: 80
})
const { cardRef: cardRef3 } = useLightCard({
  color: 'yellow',
  width: 100
})
</script>
<style lang="less" scoped>
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  .item {
    position: relative;
    // width: 200px;
    height: 200px;
    background: #1c1c1f;
    border: 1px solid rgba(255, 255, 255, 0.1);
    &.light {
      overflow: hidden;

      &:after {
        content: '';
        position: absolute;
        pointer-events: none;
        width: 60px;
        height: 60px;
        background: var(--color);
        filter: blur(var(--blur));
        top: var(--y);
        left: var(--x);
      }
    }
  }
}
</style>
