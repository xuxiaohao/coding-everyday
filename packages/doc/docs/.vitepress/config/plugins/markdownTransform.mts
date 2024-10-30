import { Plugin } from 'vitepress'

// 引入 :::demo:::
export function MarkdownTransform(): Plugin {
  return {
    name: 'vue-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.match(/\.md\b/)) {
        return null
      }

      // ! 因为一个SFC中只能有一个<script> 所以将所有的自定义容器demo组件集中到一个里导入
      let scriptStr = '',
        isFirst = true

      code = code.replace(/:::demo\s?(.*?):::/g, (_, val, index) => {
        val = val === '' ? './Demo' : val
        let str = ''
        const name = 'Demo' + index
        if (isFirst) {
          isFirst = false
          str = `
<script setup>
          import { defineAsyncComponent } from 'vue'
          ____x_slot____
          
          </script>
          `
        }

        scriptStr += `const ${name} = defineAsyncComponent(() => import('${val}.vue'))
        `

        str += `
<!-- ### demo -->
<DemoContainer>
      <Suspense>
          <${name}/>
          <template #fallback>
            Loading demo...
          </template>
      </Suspense>
</DemoContainer>
            `

        return str
      })

      return code.replace('____x_slot____', scriptStr)
    }
  }
}
