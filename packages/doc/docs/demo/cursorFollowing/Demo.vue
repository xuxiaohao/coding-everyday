<template>
  <div ref="containerRef" class="text-container">
    <div ref="textRef" class="text"></div>
    <div ref="cursorRef" class="cursor"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const containerRef = ref<HTMLElement>()
const textRef = ref<HTMLElement>()
const cursorRef = ref<HTMLElement>()

const content =
  '‌光标跟随效果‌的实现主要涉及到在文本输入或编辑界面中，光标能够实时跟随用户的输入或选择，以便用户能够直观地看到下一个输入点在哪里。这种效果在多种场景下都非常有用，比如文本编辑器、在线表单、以及需要用户输入信息的任何界面。'

function transfer(text: string) {
  return '<p>' + text + '</p>'
}
function delay(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration))
}

async function autoAppend(el, content: string) {
  for (let i = 0; i < content.length; i++) {
    const text = content.substring(0, i)
    const result = transfer(text)
    el.innerHTML = result
    updateCursor()
    await delay(100)
  }
}

function findLastTextNode(node: Element): Element | null {
  if (node.nodeType === Node.TEXT_NODE) {
    return node
  }
  const nodes = node.childNodes
  for (let i = nodes.length - 1; i >= 0; i--) {
    const result = findLastTextNode(nodes[i] as HTMLElement)
    if (result) {
      return result
    }
  }
  return null
}

// 更新光标位置
function updateCursor() {
  // 创建一个文本节点
  const textNode = document.createTextNode('I')

  //  查找text中的最后一个文本节点，将元素添加到最后一个文本节点后面
  const lastTextNode = findLastTextNode(textRef.value as HTMLElement)
  if (lastTextNode) {
    lastTextNode.parentElement?.appendChild(textNode)
  } else {
    textRef.value?.appendChild(textNode)
  }

  // 获取文本节点位置，设置光标位置
  const range = document.createRange()
  range.setStart(textNode, 0)
  range.setEnd(textNode, 0)
  const rect = range.getBoundingClientRect()

  const containerRect = containerRef.value.getBoundingClientRect()

  cursorRef.value?.setAttribute(
    'style',
    `transform:translate(${rect.x - containerRect.x}px, ${rect.y - containerRect.y}px)`
  )

  // 移除文本节点
  textNode.remove()
}

onMounted(() => {
  autoAppend(textRef.value, content)
})
</script>
<style lang="less" scoped>
.text-container {
  position: relative;
}
.cursor {
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 20px;
  background-color: #949494;
  animation: cursor 1s infinite;
}

@keyframes cursor {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  51% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
