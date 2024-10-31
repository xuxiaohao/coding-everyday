<template>
  <div>
    <NUpload :on-before-upload="onBeforeUpload">
      <NButton type="primary">上传视频文件</NButton>
    </NUpload>
    <template v-if="imgUrl">
      <h3>视频第一秒的画面</h3>
      <img :src="imgUrl" alt="" style="width: 600px" />
    </template>
  </div>
</template>
<script setup lang="ts">
  import { NUpload, NButton } from 'naive-ui'
  import { captureFrame } from './captureFrame'
  import { ref } from 'vue'

  const imgUrl = ref<null | string>(null)

  function onBeforeUpload({ file }) {
    // 类型判断，是否视频MP4格式
    if (file.type !== 'video/mp4') {
      alert('请上传MP4格式的视频文件')
    }

    // 截取视频第1秒的画面
    captureFrame(file.file, 1).then((data) => {
      imgUrl.value = data.url
    })
    return false
  }
</script>
