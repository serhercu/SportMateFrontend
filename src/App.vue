<template>
  <v-app>
    <Menu></Menu>
    <v-content>
      <component v-bind:is="pagina"></component>
    </v-content>
  </v-app>
</template>

<script>

import Menu from '@/components/menu/Menu'
import AppBase from '@/components/AppBase'

export default {
  name: 'App',
  components: {
    Menu
  },
  data: () => ({
    pagina: AppBase
  }),
};
</script>
