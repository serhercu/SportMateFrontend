<template>
	<v-dialog v-model="pShow" @click:outside="fCloseDialog" max-width="800" scrollable>
		<v-card>
			<v-container>
				<v-col class="ma-2">
					<v-row align="start" justify="space-between">
						<v-col cols="2">
							<v-icon size="100">mdi-account</v-icon>
						</v-col>
						<v-col>
							<h2>{{ pPlayer.name }}</h2>
							<v-icon>mdi-at</v-icon>{{ pPlayer.username }}
						</v-col>
						<v-col v-if="!cIsSameUser" cols="auto" class="d-flex justify-end align-start">
							<v-tooltip v-if="dStatus === ''" left>
								<template v-slot:activator="{ on, attrs }">
									<v-btn @click="fFriendRequest" color="amber" outlined v-bind="attrs" v-on="on">
										<v-icon>mdi-account-plus-outline</v-icon>
									</v-btn>
								</template>
								<span>{{$t('playerDialog.addFriend')}}</span>
							</v-tooltip>
							<v-flex v-else-if="dStatus === 'P'">
								<v-tooltip left>
									<template v-slot:activator="{ on }">
										<v-icon v-on="on">mdi-account-question-outline</v-icon>
									</template>
									<span>{{$t('playerDialog.pendingRequest')}}</span>
								</v-tooltip>
							</v-flex>
							<v-tooltip v-else-if="dStatus === 'A'" left>
								<template v-slot:activator="{ on }">
									<v-icon v-on="on" color="primary" outlined>mdi-account-check-outline</v-icon>
								</template>
								<span>{{$t('playerDialog.mutuals')}}</span>
							</v-tooltip>
						</v-col>
        	</v-row>
					<v-row class="mb-2">
						<v-divider></v-divider>
					</v-row>
					<v-row>
						<span>{{$t('playerDialog.favouriteSports')}}</span>
					</v-row>
					<v-row>
						<v-col cols="3" v-for="sport in pPlayer.sports" :key="sport" xs4 pa-2>
							<SportCard :pSport="sport" :pHover="hover"></SportCard>
						</v-col>
					</v-row>
				</v-col>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
import SportCard from '@/components/cards/SportCard'

import Constants from '@/util/constants'

import srvFriend from '@/services/srv-friend'

  export default {
		components: {
			SportCard
		},
		props: {
			pShow: {
				type: Boolean,
				required: true
			},
			pPlayer: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				dPlayer: JSON.parse(localStorage.getItem(Constants.PLAYER_INFO)),
				dStatus: null
			}
		},
		mounted() {
			this.fGetStatus()
		},
		computed: {
			cIsSameUser() {
				return this.dPlayer.id === this.pPlayer.playerId
			}
		},
		methods: {
			fCloseDialog() {
				this.$emit('update:pShow', false);
			},
			fFriendRequest() {
				srvFriend.friendRequest(JSON.parse(localStorage.getItem(Constants.PLAYER_INFO)).id, this.pPlayer.playerId).then((response) => {
					this.dStatus = response.status
				})
			},
			fGetStatus() {
				if (!this.cIsSameUser) {
					srvFriend.status(JSON.parse(localStorage.getItem(Constants.PLAYER_INFO)).id, this.pPlayer.playerId).then((response) => {
						this.dStatus = response
					})
				}
			}
  	}
  }
</script>