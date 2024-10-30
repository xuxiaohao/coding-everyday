import { defineConfig } from 'vitepress'
import sidebar from './sidebar.mts'
import viteConfig from './vite.config.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '学习小站',
  description: '个人的学习网站',
  markdown: {
    image: {
      lazyLoading: true // 启用图片懒加载
    }
  },
  lastUpdated: true,
  vite: viteConfig,
  themeConfig: {
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: '百日挑战',
        link: '/day/241029'
      }
    ],

    sidebar,

    socialLinks: [{ icon: 'github', link: 'https://github.com/xuxiaohao/coding-everyday' }]
  }
})
