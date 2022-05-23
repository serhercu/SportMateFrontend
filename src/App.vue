<template>
  <v-app>
    <Menu></Menu>
    <CreateGame></CreateGame>
  </v-app>
</template>

<script>

import Menu from '@/components/menu/Menu'
import CreateGame from '@/components/games/CreateGame'

export default {
  name: 'App',
  components: {
    Menu,
    CreateGame
  },
  data: () => ({
    //
  }),
};
</script>
