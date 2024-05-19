<template>
  <v-container mb-2>
    <v-container v-if="pItems !== null && pItems.length !== 0" v-bind="{ [`grid-list-${size}`]: true }" fluid>
      <v-flex >
        <v-layout v-for="item in pItems" :key="item" xs4 pa-2>
          <GameCard v-if="pType === 'G'" :pGame="item" :pHover="hover"></GameCard>
          <PlayerCard v-else-if="pType === 'P'" :pPlayer="item"></PlayerCard>
        </v-layout>
      </v-flex>
    </v-container>
    <v-flex v-else-if="pItems === null" class="text-center">
      <v-icon>mdi-magnify</v-icon>
      <span>{{ $t('listVertical.searchNow') }}</span>
    </v-flex>
    <v-flex v-else-if="pItems.length === 0" class="text-center">
      <v-icon>mdi-alert-circle-outline</v-icon>
      <span>{{ pNotFoundMsg !== null ? pNotFoundMsg : $t('listVertical.resultNotFound') }}</span>
    </v-flex>
  </v-container>
</template>

<script>
import PlayerCard from '@/components/cards/PlayerCard'
import GameCard from '@/components/cards/GameCard'

export default {
  components: {
    GameCard,
    PlayerCard
  },
  props: {
    pItems: {
      type: Array,
      required: false,
      default: null
    },
    pNotFoundMsg: {
      type: String,
      required: false,
      default: null
    },
    pType: {
      type: String,
      required: true
    }
  }
}
</script>
