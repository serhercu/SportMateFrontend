<template>
  <v-container fluid>
    <v-flex>
      <GameSearcher @searchGame="fFindGame"></GameSearcher>
    </v-flex>
    <v-layout column ma-2 align-center>
      <v-flex full-width>
        <p class="d-flex justify-center">Resultados</p>
        <p v-if="dGamesResult.length < 1" class="d-flex justify-center">No se han encontrado partidos</p>
      </v-flex>
      <v-flex my-2 v-for="game in dGamesResult" :key="game.id">
        <GameCard :pGame="game"></GameCard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import GameSearcher from '@/components/searcher/GameSearcher'
import GameCard from '@/components/cards/GameCard'

import srvGame from '@/services/srv-game'

export default {
  components: {
    GameSearcher,
    GameCard
  },
  mounted () {
  },
  data() {
    return {
      dGamesResult: []
    }
  },
  methods: {
    fFindGame (payload) {
      srvGame.findGameWithParams(payload).then((result) => {
        console.log(result)
        this.dGamesResult = result.data.content
      })
    }
  }
}
</script>