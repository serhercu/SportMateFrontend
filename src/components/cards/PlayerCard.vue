<template>
	<v-container fluid>
		<v-hover v-slot="{ hover }">
			<v-card @click="dDialog = true" class="mx-auto rounded-card" :elevation="hover ? 12 : 2"  width="100%" :class="{ 'on-hover': hover }">
				<v-row>
					<v-col cols="2" >
						<v-icon size="85px">mdi-account</v-icon>
					</v-col>
					<v-col>
						<v-card-title>{{ pPlayer.name }}</v-card-title>
						<v-card-subtitle>
							<v-icon>mdi-at</v-icon>
							{{ pPlayer.username }}
						</v-card-subtitle>
					</v-col>
					<v-col v-if="pShowFriendRequest && pPlayer.status === 'P'" cols="auto" class="d-flex justify-end align-start">
						<FriendRequestListButton @replyFriendRequest="fReplyFriendRequest"></FriendRequestListButton>
					</v-col>
				</v-row>
			</v-card>
		</v-hover>
		<PlayerDialog :pShow.sync="dDialog" :pPlayer="pPlayer" @fUpdateStatus="fUpdateStatus"></PlayerDialog>
	</v-container>
</template>
	
<script>
import PlayerDialog from '@/components/player/PlayerDialog'
import FriendRequestListButton from '@/components/util/player/FriendRequestListButton'

import Constants from '@/util/constants'

import srvFriend from '@/services/srv-friend'

export default {
	components: {
		PlayerDialog,
		FriendRequestListButton
	},
	data () {
		return {
			dDialog: false
		}
	},
	props: {
		pPlayer: {
			type: Object,
			required: true
		},
		pHover: {
			type: Object,
			required: false
		},
		pShowFriendRequest: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	methods: {
		fUpdateStatus(status) {
			this.pPlayer.status = status
		},
		fReplyFriendRequest(status) {
			srvFriend.replyFriendRequest(this.pPlayer.playerId, 
					JSON.parse(localStorage.getItem(Constants.PLAYER_INFO)).id, status).then((response) => {
						this.$emit('friendRequestReplied')
						this.fUpdateStatus(response.status)
			})
		},
	}
}
</script>
<style scoped>
	.rounded-card {
		border-radius: 15px;
		background-color: rgba(212, 213, 216, 0.308);
		transition: box-shadow 0.3s ease;
}
</style>