import Vue from 'vue'
import VueRouter from 'vue-router'

import CreateGame from '@/components/games/CreateGame'
import Register from '@/components/authentication/Register'

Vue.use(VueRouter)

const routes = [
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
