import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Group from '@/components/Group'
import Home from '@/components/Home'
import { auth } from '@/services'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        auth: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        auth: true
      }
    },
    {
      path: '/group',
      name: 'Group',
      component: Group,
      meta: {
        auth: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    auth.requireAuth(to, from, next)
  } else {
    next()
  }
})
export default router
