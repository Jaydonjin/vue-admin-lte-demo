import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Home from '@/components/Home'
import Demo from '@/components/Demo'
import Groups from '@/components/Groups'
import { user } from '@/api'
import { session } from '@/common'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/groups',
      name: 'Groups',
      component: Groups,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/demo',
      name: 'Demo',
      component: Demo,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (session.get('isLogin')) {
      let userInfo = session.get('userInfo')
      router.app.$store.dispatch('login', userInfo)
      next()
    } else {
      user.authorize(to, from)
        .then(({success, token, userInfo}) => {
          if (success === true) {
            session.set('isLogin', true)
            session.set('userInfo', userInfo)
            session.set('token', token)
          } else {
            // TODO(benjamin): process error
          }
          router.app.$store.dispatch('login', userInfo)
          next()
        })
    }
  } else {
    next()
  }
})
export default router
