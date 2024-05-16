<template>
  <v-container mb-2>
    <v-container v-if="pGames !== null && pGames.length !== 0" v-bind="{ [`grid-list-${size}`]: true }" fluid>
      <v-flex >
        <v-layout v-for="game in pGames" :key="game" xs4 pa-2>
          <GameCard :pGame="game" :pHover="hover"></GameCard>
        </v-layout>
      </v-flex>
    </v-container>
    <v-flex v-else-if="pGames === null" class="text-center">
      <v-icon>mdi-magnify</v-icon>
      <span>Haz tu primera busqueda</span>
    </v-flex>
    <v-flex v-else-if="pGames.length === 0" class="text-center">
      <v-icon>mdi-alert-circle-outline</v-icon>
      <span>{{ pNotFoundMsg !== null ? pNotFoundMsg : $t('listGame.resultNotFound') }}</span>
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
      default: null
    },
    pNotFoundMsg: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>
