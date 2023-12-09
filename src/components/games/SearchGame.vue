<template>
  <v-container fluid>
    <v-layout>
      <!-- Filter Card (Left Side) -->
      <v-flex xs4>
        <FiltersGame
          @applyFilters="fSearchWithFilters"
        />
      </v-flex>

      <!-- Search Results (Right Side) -->
      <v-flex xs8>
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
      dSearchGames: []
    };
  },
  methods: {
    // Callback function to receive filters from SearchFilters component
    fSearchWithFilters(filters) {
			srvGame.getGames(filters.sport, filters.level, filters.dateStart, filters.dateEnd, filters.location).then((response) => {
        this.dSearchGames = response
      })
    }
  }
}
</script>
