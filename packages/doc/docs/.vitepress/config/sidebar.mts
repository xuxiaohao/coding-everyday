import { DefaultTheme } from 'vitepress'

const sidebar: DefaultTheme.Sidebar = {
  '/day/': [
    {
      text: '2024年',
      items: [
        { text: '10-30: Promise A+', link: '/day/241030' },
        { text: '10-31: 从上传的视频文件中提取动画帧', link: '/day/241031' },
      ],
    },
  ],
}

export default sidebar
