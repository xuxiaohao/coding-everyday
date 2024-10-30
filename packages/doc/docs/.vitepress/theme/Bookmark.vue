<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    role="link"
    class="bookmark custom-block"
    :title="title"
    style="
      display: flex;
      color: inherit;
      text-decoration: none;
      user-select: none;
      transition: background 20ms ease-in 0s;
      cursor: pointer;
      flex-grow: 1;
      min-width: 0px;
      flex-wrap: wrap-reverse;
      align-items: stretch;
      text-align: left;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.13);
      border-radius: 4px;
      position: relative;
      fill: inherit;
    "
    ><div style="flex: 4 1 180px; padding: 12px 14px 14px; overflow: hidden; text-align: left">
      <div
        style="
          font-size: 14px;
          line-height: 20px;
          color: #7db828;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-height: 24px;
          margin-bottom: 2px;
        "
      >
        {{ title }}
      </div>
      <div style="display: flex; margin-top: 6px">
        <div
          style="
            font-size: 12px;
            line-height: 16px;
            color: rgba(255, 255, 255, 0.81);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          "
        >
          {{ href }}
        </div>
      </div>
    </div></a
  >
</template>
<script setup lang="ts">
const slots = defineSlots()
const txt1 = slots.default()[0].children || ''

const regexp = /\[(.*)\]\((.*)\)/

const [, title, href] = txt1.match(regexp)
</script>

<style lang="css">
.bookmark {
  padding: 0;
}
.bookmark:hover {
  background: rgba(255, 255, 255, 0.055);
}
</style>
