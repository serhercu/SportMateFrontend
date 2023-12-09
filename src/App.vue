<template>
  <v-app>
    <Menu :pIsLogged="cIsLogged"></Menu>
    <v-main>
      <component v-bind:is="dPagina"></component>
    </v-main>
  </v-app>
</template>

<script>
  import Menu from '@/components/menu/Menu'
  import AppBase from '@/components/AppBase'
  import Constants from '@/util/constants'

  export default {
    name: 'App',
    components: {
      Menu
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
