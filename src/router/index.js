import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Archive from '@/components/Archive'

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
    }
  ]
})
