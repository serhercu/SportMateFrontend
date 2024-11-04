<template>
  <v-container fluid>
    <v-container fluid v-if="pItems !== null && pItems.length !== 0" v-bind="{ [`grid-list-${size}`]: true }">
      <v-row>
        <v-col cols="3" v-for="item in pItems" :key="item" xs4>
          <GameCard v-if="pType === 'G'" :pGame="item" :pHover="hover" ></GameCard>
          <PlayerCard v-else-if="pType === 'P'" :pPlayer="item" :pShowFriendRequest="pPlayerFriendRequest" @friendRequestReplied="$emit('friendRequestReplied')"></PlayerCard>
        </v-col>
      </v-row>
    </v-container>
    <v-row v-else-if="pItems === null" class="text-center">
      <v-icon>mdi-magnify</v-icon>
      <span>{{ $t('listVertical.searchNow') }}</span>
    </v-row>
    <v-row v-else-if="pItems.length === 0" class="text-center">
      <v-icon>mdi-alert-circle-outline</v-icon>
      <span>{{ pNotFoundMsg !== null ? pNotFoundMsg : $t('listVertical.resultNotFound') }}</span>
    </v-row>
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
    },
    pPlayerFriendRequest: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
