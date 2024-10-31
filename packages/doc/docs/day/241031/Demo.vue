<template>
  <div>
    <NUpload :on-before-upload="onBeforeUpload">
      <NButton type="primary">上传视频文件</NButton>
    </NUpload>
  </div>
</template>
<script setup lang="ts">
  import { NUpload, NButton } from 'naive-ui'

  function onBeforeUpload({ file }) {
    console.log(file)

    // 类型判断，是否视频MP4格式
    if (file.type !== 'video/mp4') {
      alert('请上传MP4格式的视频文件')
    }

    return false
  }
</script>
