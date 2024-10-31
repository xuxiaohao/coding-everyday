import { defineConfig } from 'vitepress'
import sidebar from './sidebar.mts'
import viteConfig from './vite.config.mts'

const fileAndStyles: Record<string, string> = {}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '学习小站',
  description: '个人的学习网站',
  markdown: {
    image: {
      lazyLoading: true, // 启用图片懒加载
    },
  },
  lastUpdated: true,
  vite: viteConfig,
  themeConfig: {
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: '百日挑战',
        link: '/day/241030',
      },
    ],

    sidebar,

    socialLinks: [{ icon: 'github', link: 'https://github.com/xuxiaohao/coding-everyday' }],
  },
  postRender(context) {
    const styleRegex = /<css-render-style>((.|\s)+)<\/css-render-style>/
    const vitepressPathRegex = /<vitepress-path>(.+)<\/vitepress-path>/
    const style = styleRegex.exec(context.content)?.[1]
    const vitepressPath = vitepressPathRegex.exec(context.content)?.[1]
    if (vitepressPath && style) {
      fileAndStyles[vitepressPath] = style
    }
    context.content = context.content.replace(styleRegex, '')
    context.content = context.content.replace(vitepressPathRegex, '')
  },
  transformHtml(code, id) {
    const html = id.split('/').pop()
    if (!html) return
    const style = fileAndStyles[`/${html}`]
    if (style) {
      return code.replace(/<\/head>/, `${style}</head>`)
    }
  },
})
