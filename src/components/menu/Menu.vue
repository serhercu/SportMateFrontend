<template>
  <nav>
    <v-toolbar text>
      <v-app-bar-nav-icon class="grey--text" @click="dOpenDrawer = !dOpenDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">SPORT</span>
        <span>MATE</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="pIsLogged" @click="fLogout" text color ="grey">
        <span>Sign out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
      <v-btn v-else text @click="$router.push('/login')" color ="grey">
        <span>{{ $t('register.login') }}</span>
        <v-icon right>mdi-account</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer absolute temporary fixed v-model="dOpenDrawer" class="amber">
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
          <v-list-item-title class="text-h6">
            Sandra Adams
          </v-list-item-title>
          <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link>
          <v-list-item-icon>
          <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>My Files</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Shared with me</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Starred</v-list-item-title>
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
  data () {
    return {
      dOpenDrawer: false
    }
  },
  methods: {
    fLogout () {
      localStorage.setItem(Constants.IS_LOGGED, false)
      localStorage.removeItem(Constants.PLAYER_INFO)
      location.reload()
    }
  }
}

</script>