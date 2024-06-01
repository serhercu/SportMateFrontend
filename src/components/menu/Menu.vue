<template>
  <nav>
    <v-app-bar app>
      <v-app-bar-nav-icon class="grey--text" @click="dOpenDrawer = !dOpenDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text" @click="$router.push('/home')">
        <span class="font-weight-light">SPORT</span>
        <span>MATE</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="pIsLogged" @click="fLogout" text color="grey">
        <span>{{ $t('menu.signout') }}</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
      <v-btn v-else text @click="$router.push('/login')" color="grey">
        <span>{{ $t('register.login') }}</span>
        <v-icon right>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="dOpenDrawer" absolute temporary fixed class="amber">
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img :src="cIsLogged ? 'https://randomuser.me/api/portraits/women/85.jpg' : require('@/assets/unknown.avif')"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content v-if="cIsLogged">
            <v-list-item-title class="text-h6">
              {{ cPlayerInfo.name + ' ' + cPlayerInfo.surname }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ cPlayerInfo.username }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content v-else>
            <v-flex>
              <span>{{ $t('menu.notLogged') }}</span>
              <v-btn text @click="$router.push('/login')">{{ $t('menu.login') }}</v-btn>
              <v-btn text @click="$router.push('/register')">{{ $t('menu.register') }}</v-btn>
            </v-flex>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <!-- Search Game -->
        <v-list-item :disabled="!cIsLogged" link @click="$router.push('/searchGame')">
          <v-list-item-icon>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t('searchGame.searchGame') }}</v-list-item-title>
        </v-list-item>

        <!-- Create Game -->
        <v-list-item :disabled="!cIsLogged" link @click="$router.push('/createGame')">
          <v-list-item-icon>
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t('createGame.createGame') }}</v-list-item-title>
        </v-list-item>

        <!-- Calendar games -->
        <v-list-item :disabled="!cIsLogged" link @click="$router.push('/myGames')">
          <v-list-item-icon>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t('menu.gameCalendar') }}</v-list-item-title>
        </v-list-item>

        <!-- Search players -->
        <v-list-item :disabled="!cIsLogged" link @click="$router.push('/searchPlayer')">
          <v-list-item-icon>
            <v-icon>mdi-account-search</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t('menu.searchPlayer') }}</v-list-item-title>
        </v-list-item>

        <v-list-item :disabled="!cIsLogged" link @click="$router.push('/friends')">
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t('menu.myFriends') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Constants from '@/util/constants'

export default {
  props: {
    pIsLogged: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      dOpenDrawer: false
    }
  },
  methods: {
    fLogout() {
      localStorage.setItem(Constants.IS_LOGGED, false)
      localStorage.removeItem(Constants.PLAYER_INFO)
      this.$router.push('/home')
      location.reload()
    }
  },
  computed: {
    cIsLogged() {
      return localStorage.getItem(Constants.IS_LOGGED) === true || localStorage.getItem(Constants.IS_LOGGED) === 'true'
    },
    cPlayerInfo() {
      return JSON.parse(localStorage.getItem(Constants.PLAYER_INFO))
    }
  }
}
</script>
