import Vue from 'vue'
import VueRouter from 'vue-router'

import CreateGame from '@/components/games/CreateGame'

Vue.use(VueRouter)

const routes = [
  {
    path: '/createGame',
    name: 'createGame',
    component: CreateGame
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
