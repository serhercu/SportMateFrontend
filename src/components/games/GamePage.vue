<template>
	<v-container fluid>
		<v-layout>
			<v-flex xs2 sm2 md2 lg2 class="box"  mx-2>
				<v-icon size="100">{{ dGame.sport.image }}</v-icon>
			</v-flex>
			<v-flex xs8 sm8 md8 lg8 mx-2 mb-1>
				<v-flex class="title">
					<span>{{$t('sport.' + dGame.sport.name)}}</span>
				</v-flex>
				<v-flex>
					<v-layout>
						<v-icon>mdi-calendar</v-icon>
						{{ cGameDate }}
						<v-icon>mdi-clock-outline</v-icon>
						{{ cTimeParsed }}
					</v-layout>
				</v-flex>
				<v-flex mb-1>
					<v-icon>mdi-map-marker</v-icon>
					{{ dGame.city.name }}
				</v-flex>
				<v-flex>
					<v-icon>mdi-chevron-triple-up</v-icon>
						<span>Este partido tiene un nivel </span>{{ $t('level.' + dGame.level.description) }}
				</v-flex>
			</v-flex>
			<v-flex xs2 sm2 md2 lg2>
				<v-btn v-if="cIsFinished" disabled color="primary">{{ $t("gamePage.gameFinished") }}</v-btn>
				<v-btn v-else-if="cIsCanceled" disabled color="primary">{{ $t("gamePage.gameCanceled") }}</v-btn>
				<DialogApp v-else-if="cIsUserCreator" @confirm="fCancelGame" :pTitle="$t('gamePage.cancel')" :pDescription="$t('dialog.cancelGameConfirmation')">
					<template v-slot="{ openDialog, closeDialog }">
						<v-btn @click="openDialog" color="primary">{{ $t("gamePage.cancel") }}</v-btn>
					</template>
				</DialogApp>
				<v-btn v-else-if="!cBlockJoinButton" @click="fJoinGame" :disabled="dGame.players.length === dGame.playersRequired + 1"
					color="primary">{{ $t("gamePage.join") }}
				</v-btn>
				<DialogApp v-else @confirm="fLeaveGame" :pTitle="$t('gamePage.leave')" :pDescription="$t('dialog.leaveGameConfirmation')">
					<template v-slot="{ openDialog, closeDialog }">
						<v-btn @click="openDialog" color="primary">{{ $t("gamePage.leave") }}</v-btn>
					</template>
				</DialogApp>
			</v-flex>
		</v-layout>
		<v-divider></v-divider>
		<v-container>
			<v-layout justify-center>
				<span class="subtitle-upper">{{ $t('gamePage.details') }}</span>
			</v-layout>
			<v-layout justify-center class="align-text-center">
				<span>{{ dGame.description }}</span>
			</v-layout>
		</v-container>
		<v-divider></v-divider>
		<v-layout mt-4 ml-2>
			<span class="subtitle-upper">{{ cPlayersRequired }}</span>
		</v-layout>
		<v-container v-bind="{ [`grid-list-${size}`]: true }" fluid>
			<v-layout row wrap>
				<v-flex v-for="gamePlayer in dGame.players" v-bind:key="dGame.players.id" ma-2 xs3 sm3 md3 lg3>
					<PlayerCard :pPlayer="gamePlayer"></PlayerCard>
				</v-flex>
			</v-layout>
		</v-container>
	</v-container>
</template>

<script>
import PlayerCard from '@/components/cards/PlayerCard'
import DialogApp from '@/components/util/DialogApp'
import Constants from '@/util/constants'

import srvGame from '@/services/srv-game'

import { format } from 'date-fns'
import { mxDate } from '@/mixins/mxDate';

export default {
	mixins: [mxDate],
  components: {
		PlayerCard,
		DialogApp
  },
  props: {
    pGame: {
      type: Object,
      required: false,
			default: null
    }
  },
	data() {
		return {
			dGame: null,
			dPlayer: JSON.parse(localStorage.getItem(Constants.PLAYER_INFO))
		}
	},
	mounted() {
		this.fLoadGame()
	},
	computed: {
		cGameDate() {
			return format(new Date(this.dGame.date), 'dd/MM/yyyy')
		},
		cPlayersRequired() {
			return this.$t('gamePage.players') + ' (' + this.dGame.players.length + '/' + 
				(this.dGame.playersRequired + 1) + ')'
		},
		cBlockJoinButton() {
			return this.dGame.players.find(gamePlayer => gamePlayer.id === 	this.dPlayer.id)
		},
		cIsUserCreator() {
			return this.dPlayer.id === this.dGame.playerCreatorId
		},
		cIsCanceled() {
			return this.dGame.status === Constants.GAME_STATUS_CANCELED
		},
		cTimeParsed() {
			return this.mxFormatHour(this.dGame.time)
		},
		cIsFinished() {
			return new Date(this.dGame.date) < new Date()
		}
	},
	methods: {
		fLoadGame() {
			this.dGame = this.pGame
			if (this.pGame === null) {
				const gameId = this.$route.params.idGame
				srvGame.getGame(gameId).then((response) => {
					this.dGame = response
				})
			}
		},
		fJoinGame() {
			srvGame.joinGame(this.dGame.id, this.dPlayer.id).then((response) => {
				this.dGame = response
			})
		},
		fCancelGame() {
			srvGame.cancelGame(this.dGame.id, this.dPlayer.id).then((response) => {
				this.dGame = response
			})
		},
		fLeaveGame() {
			srvGame.leaveGame(this.dGame.id, this.dPlayer.id).then((response) => {
				this.dGame = response
			})
		}
	}
}
</script>