<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs4 ma-1>
        <FiltersGame @applyFilters="fSearchWithFilters"/>
      </v-flex>

      <v-flex xs8 ma-1>
        <ListGame :pGames="dSearchGames"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FiltersGame from '@/components/games/FiltersGame'
import ListGame from '@/components/games/ListGame'

import srvGame from '@/services/srv-game'

export default {
  components: {
    FiltersGame,
    ListGame
  },
  data() {
    return {
      dSearchGames: null
    };
  },
  methods: {
    fSearchWithFilters(filters) {
			srvGame.getGames(filters.sport, filters.level, filters.dateStart, filters.dateEnd, filters.location).then((response) => {
        this.dSearchGames = response
      })
    }
  }
}
</script>
