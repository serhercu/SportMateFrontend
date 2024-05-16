<template>
	<v-container>
		<v-flex mb-2>
			<h1 style="text-align: center;">{{ $t('gamesFinished.gamesFinished') }}</h1>
		</v-flex>
		
		<v-divider></v-divider>
			<ListGame :pGames="dGames" :pNotFoundMsg="$t('gamesFinished.notFound')"/>
		<v-flex>
			
		</v-flex>
	</v-container>
</template>

<script>

import ListGame from '@/components/games/ListGame'

import Constants from '@/util/constants'

import srvGame from '@/services/srv-game'

export default {
	components: {
    ListGame
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
