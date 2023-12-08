import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/structure/Home'

// Auth
import CreateGame from '@/components/games/CreateGame'
import Register from '@/components/authentication/Register'
import Login from '@/components/authentication/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/createGame',
    name: 'createGame',
    component: CreateGame
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
