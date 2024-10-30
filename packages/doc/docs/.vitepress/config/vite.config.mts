import { defineConfig } from 'vite'
import { MarkdownTransform } from './plugins/markdownTransform.mjs'
import { frontmatterTagPlugin } from './plugins/frontmatterTag.mjs'

export default defineConfig({
  plugins: [MarkdownTransform(), frontmatterTagPlugin()],
  resolve: {
    alias: {
      // '@vue3': './index.md'
    }
  }
})
