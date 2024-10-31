---
tags: [实用方法]
---

# 从上传的视频文件中提取动画帧

很多视频网站都会提供视频编辑功能，比如剪切、添加特效等。其中最基本的功能就是提取视频中的帧图片作为封面。

原理是通过`URL.createObjectURL()` 将视频文件转换为`blob`对象，然后通过canvas绘制视频帧。最后通过`canvas.toBlob()` 获取视频二进制对象。 当然也可以通过`canvas.toDataURL()` 获取base64格式的图片。

:::demo:::

::: code-group
<<< Demo.vue
<<< captureFrame.ts
:::