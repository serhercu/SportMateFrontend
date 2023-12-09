<template>
  <v-container v-bind="{ [`grid-list-${size}`]: true }" fluid>
    <v-flex>
      <v-layout v-for="game in pGames" :key="game" xs4 pa-2>
        <GameCard :pGame="game" :pHover="hover"></GameCard>
      </v-layout>
    </v-flex>
  </v-container>
</template>

<script>

import GameCard from '@/components/cards/GameCard'
export default {
  components: {
    GameCard
  },
  props: {
    pGames: {
      type: Array,
      required: false,
      default: []
    }
  }
};
</script>
