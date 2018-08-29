import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/add',
      name: 'add-question',
      component: () => import('./views/AddQuestion.vue'),
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem('overflow-token')
        if (token) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/edit/:id',
      name: 'edit-question',
      component: () => import('./views/EditQuestion.vue')
    },
    {
      path: '/questions/:id',
      name: 'detail-questions',
      component: () => import('./views/DetailQuestion.vue')
    },
    {
      path: '/answers/:id',
      name: 'edit-answer',
      component: () => import(/* webpackChunkName: "questions" */ './views/EditAnswer.vue')
    },
    {
      path: '/about',
      name: 'about'
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
