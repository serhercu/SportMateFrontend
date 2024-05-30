import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/structure/Home'

// Auth
import CreateGame from '@/components/games/CreateGame'
import Register from '@/components/authentication/Register'
import Login from '@/components/authentication/Login'
import SearchGame from '@/components/games/SearchGame'
import GamePage from '@/components/games/GamePage'
import FinishedGames from '@/components/games/myGames/FinishedGames'
import SearchPlayer from '@/components/player/SearchPlayer'
import FriendsPage from '@/components/player/FriendsPage'

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
  {
    path: '/searchGame',
    name: 'SearchGame',
    component: SearchGame
  },
  {
    path: '/searchPlayer',
    name: 'SearchPlayer',
    component: SearchPlayer
  },
  {
    path: '/game/:idGame',
    name: 'Game',
    component: GamePage
  },
  {
    path: '/myGames/gamesFinished',
    name: 'FinishedGames',
    component: FinishedGames
  },
  {
    path: '/friends',
    name: 'FriendsPage',
    component: FriendsPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
