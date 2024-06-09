<template>
  <v-app class="app-container">
    <Menu :pIsLogged="cIsLogged"></Menu>
    <v-main class="main-content">
      <component v-bind:is="dPagina"></component>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Menu from '@/components/structure/Menu'
import Footer from '@/components/structure/Footer'
import AppBase from '@/components/AppBase'
import Constants from '@/util/constants'

export default {
  name: 'App',
  components: {
    Menu,
    Footer
  },
  data() {
    return {
      dPagina: AppBase
    }
  },
  computed: {
    cIsLogged () {
      return localStorage.getItem(Constants.IS_LOGGED) === true || localStorage.getItem(Constants.IS_LOGGED) === 'true'
    }
  },
  mounted() {
    this.fLoadLoginData()
  },
  methods: {
    fLoadLoginData() {
      const loginData = localStorage.getItem(Constants.PLAYER_INFO)
      localStorage.setItem(Constants.IS_LOGGED, loginData !== null)
    }
  }
}
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  min-height: 100vh; /* Ensures the main content is at least the height of the viewport */
}
</style>
