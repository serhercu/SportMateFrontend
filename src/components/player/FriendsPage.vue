<template>
	<v-container fluid ml-4>
		<v-col  class="text-center">
			<h1>{{ $t('friends.friends') }}</h1>
		</v-col>
		<v-row v-if="dFriendRequests.length > 0">
			<v-col>
				<v-icon>mdi-account-question-outline</v-icon>
				<span class="subtitle-upper ml-2">{{ $t('friends.pendingRequests') }}</span>
			</v-col>
			<ListHorizontal :pItems="dFriendRequests" :pType="'P'" :pPlayerFriendRequest="true" @friendRequestReplied="fUpdateFriends"></ListHorizontal>
		</v-row>
		<v-row>
			<v-col>
				<v-icon>mdi-account-check-outline</v-icon>
				<span class="subtitle-upper ml-2">{{ $t('friends.myFriends') }}</span>
			</v-col>
			<ListHorizontal :pItems="dFriends" :pType="'P'"></ListHorizontal>
		</v-row>
	</v-container>
</template>

<script>

import ListHorizontal from '@/components/util/ListHorizontal'

import Constants from '@/util/constants'

import srvFriend from '@/services/srv-friend'

export default {
	components: {
    ListHorizontal
  },
  data() {
    return {
      dFriendRequests: [],
			dFriends: []
    }
  },
	mounted() {
		this.fUpdateFriends()
	},
  methods: {
		fUpdateFriends() {
			this.fGetFriendRequests()
			this.fGetFriends()
		},
		fGetFriendRequests() {
			srvFriend.getFriendRequestByPlayer(JSON.parse(localStorage.getItem(Constants.PLAYER_INFO)).id).then((response) => {
				this.dFriendRequests = response
			})
		},
		fGetFriends() {
			srvFriend.getFriendsByPlayer(JSON.parse(localStorage.getItem(Constants.PLAYER_INFO)).id).then((response) => {
				this.dFriends = response
			})
		}
  }
}
</script>
