import Vue from 'vue'
import App from './IndexBlog'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#indexblog',
  router,
  render: h => h(App)
})
