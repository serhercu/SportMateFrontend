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
        <ListGame
          :filteredResults="filteredResults"
        />
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
      // Assuming you have an array of game data
      allGames: null,
      // Filtered results to be passed to the SearchResults component
      filteredResults: null
    };
  },
  methods: {
    // Callback function to receive filters from SearchFilters component
    fSearchWithFilters(filters) {
			srvGame.getGames(filters.sport, filters.level, filters.dateStart, filters.dateEnd, filters.location)
    },
    filterGames(filters) {
      // Implement your filtering logic here based on filters
      // Return the filtered results
    }
  }
};
</script>
