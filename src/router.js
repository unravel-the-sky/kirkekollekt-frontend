import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Home from './views/MainPage'
import RegisterOrganisation from './views/RegisterOrganisation'
import Organisations from './views/Organisations'
import Admin from './views/Admin'
import Login from './views/LoginPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: '/main',
        name: 'organisations',
        component: Organisations,
        props: true
      }, {
        path: '/register',
        name: 'register',
        component: RegisterOrganisation
      }]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})