import { Plugin } from 'vitepress'

// 引入 :::demo:::
export function frontmatterTagPlugin(): Plugin {
  return {
    name: 'vue-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.match(/\.md\b/)) {
        return null
      }

      // 排除frontmatter标签
      let index = 0,
        frontmatterStr = ''
      const regexp = /^---.*?\n---/gs
      if (regexp.test(code)) {
        index = regexp.lastIndex
        frontmatterStr = code.substring(0, index)
      }

      // 插入到一级标题后面
      let content = code.substring(index).replace(/#[^#].*/, (s) => {
        return s + `\n<FrontMatterTags />\n`
      })

      code = frontmatterStr + content

      return code
    }
  }
}
