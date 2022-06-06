import Vue from 'vue'
import VueRouter from 'vue-router'

import CreateGame from '@/components/games/CreateGame'
import FindGame from '@/components/games/FindGame'

Vue.use(VueRouter)

const routes = [
  {
    path: '/createGame',
    name: 'createGame',
    component: CreateGame
  },
  {
    path: '/findGame',
    name: 'findGame',
    component: FindGame
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
