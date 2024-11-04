<template>
	<v-container>
		<v-flex mb-2>
			<h1 style="text-align: center;">{{ $t('gamesFinished.gamesFinished') }}</h1>
		</v-flex>
		
		<v-divider></v-divider>
			<ListVertical :pType="'G'" :pItems="dGames" :pNotFoundMsg="$t('gamesFinished.notFound')"/>
		<v-flex>
			
		</v-flex>
	</v-container>
</template>

<script>

import ListVertical from '@/components/util/ListVertical'

import Constants from '@/util/constants'

import srvGame from '@/services/srv-game'

export default {
	components: {
    ListVertical
  },
  data() {
    return {
      dGames: []
    }
  },
	mounted() {
		this.fGetFinishedGames()
	},
  methods: {
		fGetFinishedGames() {
			srvGame.finishedGames(JSON.parse(localStorage.getItem(Constants.PLAYER_INFO)).id).then((response) => {
				this.dGames = response
			})
		}
  }
}
</script>
