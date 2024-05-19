<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs4 ma-1>
        <FiltersGame @applyFilters="fSearchWithFilters"/>
      </v-flex>

      <v-flex xs8 ma-1>
        <ListVertical :pType="'G'" :pItems="dSearchGames"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FiltersGame from '@/components/games/FiltersGame'
import ListVertical from '@/components/util/ListVertical'

import srvGame from '@/services/srv-game'

export default {
  components: {
    FiltersGame,
    ListVertical
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
