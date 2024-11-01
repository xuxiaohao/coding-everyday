import { defineConfig } from 'vite'
import { MarkdownTransform } from './plugins/markdownTransform.mjs'
import { frontmatterTagPlugin } from './plugins/frontmatterTag.mjs'

export default defineConfig({
  plugins: [MarkdownTransform(), frontmatterTagPlugin()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // naive-ui组件打包时的特殊处理
  // https://www.naiveui.com/zh-CN/os-theme/docs/vitepress
  ssr: {
    noExternal: ['naive-ui', 'date-fns', 'vueuc'],
  },
})
