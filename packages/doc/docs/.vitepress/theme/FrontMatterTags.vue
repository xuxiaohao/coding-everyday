<template>
  <p>
    <n-space>
      <n-tag
        v-for="(tag, index) in frontmatter.tags"
        :key="tag + index"
        :bordered="false"
        :type="types[index % 5]"
        >{{ tag }}</n-tag
      >
    </n-space>
    <!-- 页面内容的其他部分 -->
  </p>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import * as pkg from 'naive-ui'
const { NSpace, NTag } = pkg
const { frontmatter } = useData()
const types: any[] = ['success', 'info', 'warning', 'danger', 'error']
</script>
