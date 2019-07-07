import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Archive from '@/components/Archive'
import Page from '@/components/Page'
import Config from '@/config.js'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/archive/',
      name: 'Archive',
      component: Archive
    },
    {
      path: '/page/:id',
      name: 'Page',
      component: Page
    }
  ]
})
