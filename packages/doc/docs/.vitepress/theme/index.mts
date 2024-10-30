import './custom.less'
import DefaultTheme from 'vitepress/theme'
import Bookmark from './Bookmark.vue'
// import ParticleBox from './ParticleBox.vue'
import DemoContainer from './DemoContainer.vue'
import FrontMatterTags from './FrontMatterTags.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Bookmark', Bookmark)
    // app.component('ParticleBox', ParticleBox)
    app.component('DemoContainer', DemoContainer)
    app.component('FrontMatterTags', FrontMatterTags)
  }
}
